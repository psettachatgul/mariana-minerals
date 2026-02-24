import { handleRoute } from '@/projects/base-web-app-nextjs/_lib/routes';
import { NextResponse } from 'next/server';
import { TExampleParams, ZExampleParams } from './_schemas';

export const maxDuration = 300;

// this is just an example on how to handle a get with params
export const GET = handleRoute<'/api/example', TExampleParams>(
  async (
    request,
    { params: { param1 } },
  ) => {

    console.log('*************** param1 GET, ', param1);

    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  },
  {
    paramsParser: ZExampleParams.parse,
  },
);

// this is an example of handling a post with a post body
export const POST = handleRoute<'/api/example', TExampleParams>(
  async (
    request,
  ) => {

    const { param1 } = ZExampleParams.parse(await request.json());
    console.log('*************** param1 POST, ', param1);

    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  },
);
