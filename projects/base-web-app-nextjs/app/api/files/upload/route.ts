import { uploadJsonStream } from '@patson/utils/jsonStreamHelpers';
import { del } from '@vercel/blob';
import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { handleRoute } from '../../../../_lib/routes';
import { TUploadFileParams, ZUploadFileParams } from './_schemas';

export const maxDuration = 300;

export const POST = handleRoute<'/api/files/upload', TUploadFileParams>(
  async (
    request,
    { params: { fileName } },
  ) => {

    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {

        return {
          allowedContentTypes: ['application/json'],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {

        console.log(`going to process ${fileName} ${blob.url}`);

        const response = await axios.get(blob.url, { responseType: 'stream' });
        await uploadJsonStream(response.data, {/** config stuff */ });
        await del(blob.url);

      },
    });

    return NextResponse.json(
      jsonResponse,
      { status: 200 },
    );
  },
  {
    paramsParser: ZUploadFileParams.parse,
  },
);
