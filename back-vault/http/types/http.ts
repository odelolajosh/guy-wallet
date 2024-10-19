import type { Request as ExpressRequest, Response as ExpressResponse } from "express";

type Dictionary<T=any> = Record<string, T>;

export type Request<Body = {}, Query extends Dictionary = {}, Params extends Dictionary = {}> = ExpressRequest<any, any, Body, Query, Params>;

export type Response<Data = any> = ExpressResponse<Data>;
