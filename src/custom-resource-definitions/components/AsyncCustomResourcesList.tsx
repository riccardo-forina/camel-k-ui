import * as React from 'react';
import { IRestState } from '../../containers/index';
import { ICustomResource } from '../../containers/kubernetes.models';
import { RestError, withLoadingHoc } from '../../ui/index';
import { CustomResourcesList } from './index';

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
  ({ error, data, children }) =>
    error ? <RestError /> : (
      <CustomResourcesList resources={data.items} children={children} />
    )
);
