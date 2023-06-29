/* eslint-disable @next/next/no-img-element */
import { useGetProduct } from 'hook/api';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './products.module.css';
const Product = () => {
  const { query } = useRouter();

  const { data: product } = useGetProduct({
    id: Number(query.id as string),
    options: {
      enabled: query.id !== undefined
    }
  });

  return (
    <div className={styles.card} data-testid="card">
      <img src={product?.image} alt={product?.title} />
      <p data-testid="productTitle">
        {product?.title} -{' '}
        <span data-testid="productPrice">{product?.price}$</span>
      </p>
      <p>{product?.description}</p>
    </div>
  );
};

export default Product;
