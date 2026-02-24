import { NextRequest, NextResponse } from 'next/server';
import { ZodType } from 'zod';

export interface IBaseResponse {
  success: boolean;
  message: string;
}

export interface IBaseErrorResponse extends IBaseResponse {
  status: number;
  name: string;
}

export type TREQUESTPARAMS<T> = { params: T, headers: Record<string, string>; };

export type THASPARAMS<T> = [T] extends [never] ? Omit<TREQUESTPARAMS<T>, 'params'> : TREQUESTPARAMS<T>;

export type TNEXTROUTEPARAMS<T> = [T] extends [never] ? never : TREQUESTPARAMS<T>;

export type TAPIROUTEHANDLERRESPONSE<T> = Promise<NextResponse<T> | NextResponse<IBaseErrorResponse>>;

export type TAllParams<TPARAMS> = {
  params: TPARAMS,
  headers: unknown;
};

export type ApiRouteHandler<T = unknown, TPARAMS = never> =
  (req: NextRequest, params: TAllParams<TPARAMS>) => TAPIROUTEHANDLERRESPONSE<T>;


export type Middleware<T, TPARAMS> = (
  req: NextRequest,
  params: { params: TPARAMS, headers: unknown; } | undefined,
  handler: ApiRouteHandler<T, TPARAMS>
) => TAPIROUTEHANDLERRESPONSE<T>;

export type RouteOptions<T, TPARAMS> = {
  isExposed?: boolean;
  middleware?: Middleware<T, TPARAMS>;

} & ([TPARAMS] extends [never] ? { paramsParser: undefined; } : { paramsParser: ZodType<TPARAMS>['parse']; });
