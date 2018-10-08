import * as React from 'react';
import { CustomResourcesList } from '.';
import { IRestState } from '../../../../rest';
import { withLoadingHoc } from '../../../../ui';
import { ICustomResource } from '../../../kubernetes.models';

export interface IAsyncCustomResourcesList extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: ICustomResource[];
  };
  children(customResource: ICustomResource, index: number): any;
}

export const AsyncCustomResourcesList = withLoadingHoc<IAsyncCustomResourcesList>(
  ({ data, children }) => <CustomResourcesList resources={data.items} children={children} />
);
