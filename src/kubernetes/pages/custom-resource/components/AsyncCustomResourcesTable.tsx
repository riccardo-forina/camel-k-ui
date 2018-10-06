import * as React from 'react';
import { CustomResourcesTable } from '.';
import { IRestState } from '../../../../rest';
import { withLoadingHoc } from '../../../../ui';
import { ICustomResource } from '../../../kubernetes.models';

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
  ({ data }) => <CustomResourcesTable resources={data.items} />
);
