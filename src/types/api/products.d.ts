import { IRQHookArgs } from 'types/react-query';

export interface IGetProductsReqParams {
  limit: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface IGetProductsArgs<T, U>
  extends IRQHookArgs<T, U>,
    IGetProductsReqParams {}

export interface IGetProductReqParams {
  id: number;
}

export interface IGetProductArgs<T, U>
  extends IRQHookArgs<T, U>,
    IGetProductReqParams {}
