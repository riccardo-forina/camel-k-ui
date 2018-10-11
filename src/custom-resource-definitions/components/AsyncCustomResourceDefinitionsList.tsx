import * as React from 'react';
import { IRestState } from '../../containers/index';
import { ICustomResourceDefinition } from '../../containers/kubernetes.models';
import { RestError, withLoadingHoc } from '../../ui/index';
import { CustomResourceDefinitionsList } from './index';

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
