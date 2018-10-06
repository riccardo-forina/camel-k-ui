import * as React from 'react';
import { ICustomResource, ICustomResourceDefinition, KubernetesRest } from '../../..';
import { IRestState } from '../../../../rest';


interface ICustomResourcesResponse extends IRestState {
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


export interface IWithCustomResourcesProps {
  crd: ICustomResourceDefinition;
  children(props: ICustomResourcesResponse): any;
}

export class WithCustomResources extends React.Component<IWithCustomResourcesProps> {
  public render() {
    return (
      <KubernetesRest
        url={`/apis/${this.props.crd.spec.group}/${this.props.crd.spec.version}/${this.props.crd.spec.names.plural}`}
        method={'GET'}
      >
        {props => this.props.children(props)}
      </KubernetesRest>
    )
  }
}