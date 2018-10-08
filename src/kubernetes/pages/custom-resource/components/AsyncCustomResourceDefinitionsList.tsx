import * as React from 'react';
import { CustomResourceDefinitionsList } from '.';
import { IRestState } from '../../../../rest';
import { RestError, withLoadingHoc } from '../../../../ui';
import { ICustomResourceDefinition } from '../../../kubernetes.models';

interface IAsyncCustomResourceDefinitionsList extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: ICustomResourceDefinition[];
  };
  children(props: ICustomResourceDefinition): any;
}

export const AsyncCustomResourceDefinitionsList = withLoadingHoc<IAsyncCustomResourceDefinitionsList>(
  ({ error, data, children }) => (
    error ? <RestError /> : (
      <CustomResourceDefinitionsList customResourceDefinitions={data.items}>
        {props => children(props)}
      </CustomResourceDefinitionsList>
    )
  )
);
