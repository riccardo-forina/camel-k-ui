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
  }
}

export const AsyncCustomResourcesList = withLoadingHoc<IAsyncCustomResourcesList>(
  ({ data }) => <CustomResourcesList resources={data.items} />
);
