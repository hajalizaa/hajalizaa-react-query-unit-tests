import { productsMock } from 'mocks/products';
import Products from '../products';
import { render } from 'utils/testing/render';
import { PRODUCTS } from 'constants/queryKeys';

describe('supervisor form', () => {
  it('should show all mocked products', () => {
    const rendered = render({
      component: <Products />,
      reactQueryData: [
        {
          data: productsMock,
          queryKey: [PRODUCTS]
        }
      ]
    });

    expect(rendered.getAllByTestId('card').length).toBe(productsMock.length);
  });

  it('should show first product title', () => {
    const rendered = render({
      component: <Products />,
      reactQueryData: [
        {
          data: productsMock,
          queryKey: [PRODUCTS]
        }
      ]
    });

    expect(rendered.getAllByTestId('card')[0].textContent).toContain(
      productsMock[0].title
    );
  });

  it('should add product title to product card title', () => {
    const rendered = render({
      component: <Products />,
      reactQueryData: [
        {
          data: productsMock,
          queryKey: [PRODUCTS]
        }
      ]
    });

    expect(rendered.getAllByTestId('card')[0].title).toBe(
      productsMock[0].title
    );
  });
});
