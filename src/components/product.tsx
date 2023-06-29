/* eslint-disable @next/next/no-img-element */
import { useGetProduct } from 'hook/api';
import React from 'react';
import { useRouter } from 'next/router';

import styles from './products.module.css';

const Product = () => {
  const { query } = useRouter();

  const {
    data: product,
    isLoading,
    isFetching
  } = useGetProduct({
    id: parseInt((query.product as string) || '0'),
    options: {
      enabled: query.product !== undefined
    }
  });

  if (isLoading || isFetching) {
    return <>loading...</>;
  }

  return (
    <div>
      <div className={styles.card}>
        <img src={product?.image} alt={product?.title} />
        <p>
          {product?.title} - {product?.price}$
        </p>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default Product;
