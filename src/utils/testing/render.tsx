import { ReactNode } from 'react';
import { withRQ } from './withRQ';

export interface IRender {
  component: ReactNode;
  reactQueryData?: {
    queryKey: string[];
    data: any;
  }[];
}

export const render = ({ component, reactQueryData = [] }: IRender) => {
  return withRQ(component, reactQueryData);
};
