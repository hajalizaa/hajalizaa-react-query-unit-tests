import Products from '../products';
import { screen } from '@testing-library/react';
import { render } from 'utils/testing/render';

describe('supervisor form', () => {
  render({
    component: <Products />,
    reactQueryData: []
  });
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
