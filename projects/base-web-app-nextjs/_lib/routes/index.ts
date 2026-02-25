import '../iocConfig/mock/server';

import { AppRouteHandlerRoutes } from '@patson/base-web-app-nextjs/.next/dev/types/routes';
import { NextRequest, NextResponse } from 'next/server';
import { ZodType } from 'zod';
import { runInSessionContext } from '../contexts/session';
import { ApiRouteHandler, IBaseErrorResponse, RouteOptions, TAllParams } from './types';

export const getAllParams = async <TROUTE extends AppRouteHandlerRoutes, TPARAMS>(
  request: NextRequest,
  { params }: RouteContext<TROUTE>,
  parser?: ZodType<TPARAMS>['parse'],
): Promise<TAllParams<TPARAMS>> => {


  // get any query string values
  const searchParams = request.nextUrl.searchParams.entries();
  const queryParams = Object.fromEntries(searchParams);

  // get any header values
  const headers = Object.fromEntries(request.headers);

  const slugs = await params;

  const paramsCombined = {
    ...slugs,
    ...queryParams,
  };

  const allParams = {
    params: parser?.(paramsCombined) ?? (params as TPARAMS),
    headers,
  };

  return allParams;
};

const requestMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
type RequestMethod = typeof requestMethods[number];

const isRequestMethod = (value: unknown): value is RequestMethod => {
  return requestMethods.includes(value as RequestMethod);
};

const invalidMethod = async () => {
  return NextResponse.json<IBaseErrorResponse>({
    success: false,
    status: 405,
    name: 'RequestError',
    message: 'Invalid Method',
  }, {
    status: 405,
  });
};

export const handleRoute = <TROUTE extends AppRouteHandlerRoutes, TPARAMS = never, T = unknown>(
  handleMethod: ApiRouteHandler<T, TPARAMS>,
  options: RouteOptions<T, TPARAMS> = { paramsParser: undefined } as RouteOptions<T, TPARAMS>,
) => {

  return async (
    request: NextRequest,
    params: RouteContext<TROUTE>,
  ) => {

    process.env.NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
    const allParams = await getAllParams(request, params, options.paramsParser);

    const handlerCb =
      async (req: NextRequest, params: TAllParams<TPARAMS>) => {

        try {

          if (!isRequestMethod(req.method)) return invalidMethod();

          if (!handleMethod) return invalidMethod();

          if (options.middleware) {
            return await options.middleware(req, params, handleMethod);
          } else {
            return await handleMethod(req, params);
          }

        } catch (error) {
          console.log(error);
          return NextResponse.json({
            success: false,
            status: 500,
            name: 'UnknownError',
            message: 'Something went horribly wrong',
          }, {
            status: 500,
          });
        }
      };

    return runInSessionContext(
      {
        initialValues: { request },
        cb: handlerCb,
      },
      request,
      allParams,
    );

  };

};
