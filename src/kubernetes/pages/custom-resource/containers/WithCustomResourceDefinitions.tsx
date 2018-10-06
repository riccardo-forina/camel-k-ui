import * as React from 'react';
import { ICustomResourceDefinition, KubernetesRest } from '../../..';
import { IRestState } from '../../../../rest';


interface ICustomResourceDefinitionResponse extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: ICustomResourceDefinition[];
  }
}


export interface IWithCustomResourceDefinitionsProps {
  children(props: ICustomResourceDefinitionResponse): any;
}

export class WithCustomResourceDefinitions extends React.Component<IWithCustomResourceDefinitionsProps> {
  public render() {
    return (
      <KubernetesRest
        url={'/apis/apiextensions.k8s.io/v1beta1/customresourcedefinitions'}
        method={'GET'}
      >
        {props => this.props.children(props)}
      </KubernetesRest>
    )
  }
}