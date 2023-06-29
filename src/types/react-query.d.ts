import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export interface IRQHookArgs<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> {
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
}