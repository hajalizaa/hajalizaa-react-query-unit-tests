import { useQuery } from '@tanstack/react-query';

import { IError } from 'config/axios';
import { PRODUCT, PRODUCTS } from 'constants/queryKeys';
import { getProduct, getProducts } from 'services';
import {
  IGetProductArgs,
  IGetProductsArgs,
  IProduct
} from 'types/api/products';

export const useGetProducts = ({
  limit,
  options
}: IGetProductsArgs<IProduct[], IError>) => {
  return useQuery<IProduct[], IError>(
    [PRODUCTS],
    () => getProducts({ limit }),
    options
  );
};

export const useGetProduct = ({
  id,
  options
}: IGetProductArgs<IProduct, IError>) => {
  return useQuery<IProduct, IError>(
    [PRODUCT],
    () => getProduct({ id }),
    options
  );
};
