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
