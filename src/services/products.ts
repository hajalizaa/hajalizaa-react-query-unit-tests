import axiosHandler from 'config/axios';
import { urls } from 'constants/urls';
import {
  IGetProductReqParams,
  IGetProductsReqParams
} from 'types/api/products';

export const getProducts = async ({ limit }: IGetProductsReqParams) => {
  return axiosHandler
    .get(`${urls.products}?limit=${limit}`)
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};

export const getProduct = async ({ id }: IGetProductReqParams) => {
  return axiosHandler
    .get(`${urls.products}/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};
