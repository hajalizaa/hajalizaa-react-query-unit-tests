import { PRODUCT } from 'constants/queryKeys';
import { productsMock } from 'mocks/products';
import mockRouter from 'next-router-mock';
import { render } from 'utils/testing/render';
import Product from '../product';

jest.mock('next/router', () => require('next-router-mock'));

// navigate to localhost:3000/products/[id]
// simulating we are navigated to products/1

describe('supervisor form', () => {
  const product = productsMock[0];
  mockRouter.push(`/products/2`);

  it('should render product title in detail page', () => {
    const rendered = render({
      component: <Product />,
      reactQueryData: [
        {
          data: product,
          queryKey: [PRODUCT]
        }
      ]
    });

    expect(rendered.getByTestId('productTitle').textContent).toContain(
      product.title
    );
  });

  it('should render product price in detail page', () => {
    const rendered = render({
      component: <Product />,
      reactQueryData: [
        {
          data: product,
          queryKey: [PRODUCT]
        }
      ]
    });

    expect(rendered.getByTestId('productPrice').textContent).toContain(
      `${product.price}$`
    );
  });
});
