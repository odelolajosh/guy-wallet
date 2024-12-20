/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultOptions, QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const defaultOptions: DefaultOptions = {
  queries: {
    throwOnError(error) {
      return ((error as AxiosError)?.response?.status ?? 400) >= 500;
    },
    retry: false,
    refetchOnWindowFocus: false
  }
};

export const queryClient = new QueryClient({ defaultOptions });

type PromiseValue<T> = T extends Promise<infer U> ? U : T;

export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;
