import * as React from 'react';
import { IRestState } from '../../containers/index';
import { ICustomResource } from '../../containers/kubernetes.models';
import { RestError, withLoadingHoc } from '../../ui/index';
import { CustomResourcesTable } from './index';

export interface IAsyncCustomResourcesTable extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: ICustomResource[];
  }
}

export const AsyncCustomResourcesTable = withLoadingHoc<IAsyncCustomResourcesTable>(
  ({ error, data }) =>
    error ? <RestError /> : (
      <CustomResourcesTable resources={data.items} />
    )
);
