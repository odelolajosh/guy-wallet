import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from "express";

type Dictionary<T=any> = Record<string, T>;

export type Request<Body = {}, Query extends Dictionary = {}, Locals extends Dictionary = {}> = ExpressRequest<any, any, Body, Query, Locals>;

export type Response<Data = any> = ExpressResponse<Data>;

export type NextFunction = ExpressNextFunction;

