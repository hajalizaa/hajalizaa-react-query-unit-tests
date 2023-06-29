# React-Query Unit-Tests

This project aims to provide a comprehensive example and guidance for writing unit tests specifically for components that utilize the powerful React Query library. Writing tests for components that interact with APIs and manage data fetching can be challenging, but with the proper setup and understanding of testing methodologies, it becomes more manageable and efficient.

By exploring this project, you will gain insights into best practices and effective strategies for testing components that use React Query. It will serve as a reference point to understand how to structure your test suite, set up the necessary testing utilities and libraries, and write meaningful test cases.

## Usage

**First, install dependencies with following command**

```bash
npm install
```

or

```bash
yarn
```

**To run tests, run the following command**

```bash
npm run test
```

or

```bash
yarn test
```

**To start development server, run the following command**

```bash
npm run dev
```

or

```bash
yarn dev
```

## withRQ function

In the `src/utils/testing/withRQ.tsx` file, you will find a valuable utility function that enhances the testing capabilities for components utilizing `react-query`. This function plays a crucial role in creating a mock query client provider, allowing you to simulate and control query responses during testing.

The content of the withRQ function is as follows:

```
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const withRQ = (
  component: ReactNode,
  initialData: {
    queryKey: string[];
    data: any;
  }[]
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error:
        process.env.NODE_ENV === 'test'
          ? () => {
              return;
            }
          : console.error
    }
  });

  initialData.map((el) => {
    queryClient.setQueryData(el.queryKey, el.data);
  });

  return (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};
```

The `withRQ` function is designed to facilitate testing of components that utilize the `react-query` library. It creates a mock query client provider by wrapping the given `component` with a `QueryClientProvider` from `@tanstack/react-query`.

Here's an explanation of how the function works:

The function takes two parameters:

`component` (`ReactNode`): The component to be rendered and wrapped with the mock query client provider.

`initialData` (Array): An array of objects that define the initial data for queries. Each object contains two properties:

`queryKey` (Array of strings): The query key used to identify the specific query.

`data` (any): The initial data to be set for the query.

Inside the function, a new instance of `QueryClient` is created, which is the query client provided by `react-query`. It accepts an options object, which includes:

`defaultOptions` for queries, where `retry` is set to `false` to disable automatic retrying of failed queries.

`logger` configuration that determines how logs and errors are handled. In the case of `process.env.NODE_ENV === 'test'`, the error logging is overridden with a no-op function to suppress errors during testing.

The initial data provided in the `initialData` array is iterated over using `map()`. For each object in the array, the `setQueryData` method of the query client is called to set the initial data for the corresponding query key.

Finally, the `component` is rendered within the `QueryClientProvider`, with the queryClient instance passed as the `client` prop. This ensures that the component has access to the mock query client during testing.

By using the `withRQ` function, you can conveniently create a mock query client provider for testing your components that rely on `react-query`, allowing you to provide initial data and customize query options as needed.

## render function

In the `src/utils/testing/render.tsx` file, you will find a powerful utility function that simplifies the process of rendering and testing React components. This function leverages the capabilities of the `@testing-library/react` library to provide a streamlined testing experience.

Here's an overview of the content of the render function:

```
import { render as tRender } from '@testing-library/react';

import { withRQ } from './withRQ';

export interface IRender {
  component: any;
  reactQueryData?: {
    queryKey: string[];
    data: any;
  }[];
}

export const render = ({ component, reactQueryData = [] }: IRender) => {
  return tRender(withRQ(component, reactQueryData));
};

```

The `render` function is a utility function that facilitates testing of React components by combining the rendering capabilities provided by `@testing-library/react` with the withRQ function.

Here's an explanation of how the function works:

The function imports the `render` function from `@testing-library/react` and the `withRQ` function from the local `withRQ` module. The `render` function is aliased as `tRender` to avoid naming conflicts.

The function defines an interface called `IRender`, which describes the expected shape of the input object for the `render` function. It has two properties:

`component` (`any`): The component to be rendered and tested.

`reactQueryData` (optional array): An array of objects that define the initial data for queries, similar to the `initialData` parameter in the `withRQ` function. Each object contains two properties:

`queryKey` (Array of strings): The query key used to identify the specific query.

`data` (any): The initial data to be set for the query.

The `render` function itself takes a single parameter, an object that matches the `IRender` interface. It destructures the `component` and `reactQueryData` properties from the input object.

Inside the function, the `render` function from `@testing-library/react` is called, but instead of directly rendering the component, it utilizes the `withRQ` function to wrap the component with a mock query client provider. This is done by passing the `component` and `reactQueryData` to the `withRQ` function and then passing the resulting wrapped component to `tRender`.

Finally, the result of the `tRender` function is returned from the `render` function, allowing you to access the rendered component and perform testing assertions using the utilities provided by `@testing-library/react`.

By using the `render` function, you can conveniently render and test your React components while also having the ability to provide initial query data through the `reactQueryData` parameter. This allows you to test components that rely on `react-query` with custom query data configurations, enhancing the flexibility and effectiveness of your component testing.

## Components

The `Products` component, located in `src/components/products.tsx`, is a React component responsible for rendering a list of products. It utilizes the `useGetProducts` hook from the `hook/api/products` module to fetch product data.

The component iterates over the `products` array obtained from the hook's response. For each product, it renders a `Link` component from `next/link`, creating a clickable link to navigate to the individual product page.

Within the `Link` component, the `data-testid` attribute allows for easy identification of the card during testing.

Overall, the `Products` component renders a visually pleasing list of `products` with their relevant details and provides navigation links to view individual product pages.

```bash
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
```

The `Product` component, located in `src/components/product.tsx`, is a `React` component that displays the details of a specific product. It utilizes the `useGetProduct` hook to fetch the product data based on the `ID` provided in the `URL` query parameter. The component renders the product's image, title, price, and description in a card-like element.

```bash
import { useGetProduct } from 'hook/api';
import React from 'react';
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
```

## Unit Tests

**Unit Tests for `Products` Component:**

```bash
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
```

The `products.test.tsx` file, located in `src/components/__test\__/products.test.tsx`, contains tests for the `Products` component.

The first test, titled `'should show all mocked products'`, verifies that the component displays all the mocked products correctly. It uses the `render` function from the `utils/testing/render` module to `render` the `Products` component with mock data provided through the `reactQueryData` parameter. The test checks if the number of rendered elements with the `data-testid` of `'card'` matches the length of the `productsMock` array.

The second test, titled `'should show first product title'`, ensures that the component displays the title of the first product correctly. It also uses the render function with mock data and checks if the text content of the first element with the `data-testid` of `'card'` contains the title of the first product from `productsMock`.

The third test, titled `'should add product title to product card title'`, validates that the `title` attribute of the first element with the `data-testid` of `'card'` matches the `title` of the first product from `productsMock`. Again, the test utilizes the render function with mock data to render the component.

These tests verify the expected behavior of the `Products` component by checking if the rendered output matches the provided mock data.

**Unit Tests for `Product` Component:**

```bash
import { PRODUCT } from 'constants/queryKeys';
import { productsMock } from 'mocks/products';
import mockRouter from 'next-router-mock';
import { render } from 'utils/testing/render';
import Product from '../product';

jest.mock('next/router', () => require('next-router-mock'));

describe('Product detail tests', () => {
  const product = productsMock[0];
  // navigate to localhost:3000/products/[id]
  // simulating we are navigated to products/1
  mockRouter.push(`/products/${product.id}`);

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
```

The `product.test.tsx` file, located in `src/components/__test\__/product.test.tsx`, contains unit tests for the `Product` component. These tests aim to verify the functionality and rendering of the component in different scenarios.

The tests included in this file are:

`"should render product title in detail page"`: This test ensures that the `Product` component correctly renders the `title` of the `product` on the detail page. It uses the `render` function to render the component with `mock` data provided through the `reactQueryData` parameter. The test asserts that the text content of the element with the `data-testid` of `'productTitle'` contains the product's title from the product object.

`"should render product price in detail page"`: This test validates that the `Product` component renders the product's `price` on the detail page. It also utilizes the `render` function with mock data and checks if the text content of the element with the `data-testid` of `'productPrice'` contains the formatted price value from the product object.

To simulate navigation to the product detail page, the `mockRouter` object is used from the `next-router-mock` library. The push method is invoked to navigate to a specific `URL` path, simulating the behavior of navigating to `localhost:3000/products/[id]`. In this case, it simulates navigating to the `products/1` URL.

These unit tests verify that the `Product` component correctly renders the `title` and `price` of a specific product on the detail page. They help ensure that the component behaves as expected and displays the relevant information accurately.

## Authors

- [@hajalizaa](https://www.github.com/hajalizaa)
