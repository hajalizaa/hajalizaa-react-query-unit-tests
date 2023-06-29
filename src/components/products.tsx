/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useGetProducts } from 'hook/api/products';

import styles from './products.module.css';

const Products = () => {
  const { data: products = [] } = useGetProducts({ limit: 10 });

  return (
    <div className={styles.products}>
      {products?.map((product) => (
        <Link
          className={styles.link}
          key={product.id}
          href={`/products/${product.id}`}>
          <div title={product.title} className={styles.card} data-testid="card">
            <img src={product.image} alt={product.title} />
            <p>
              {product.title} - {product.price}$
            </p>
            <p>{product.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
