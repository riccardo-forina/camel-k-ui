import * as React from 'react';
import { ICustomResource, IRestState, KubernetesRest } from './index';


export interface ICustomResourcesResponse extends IRestState {
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
  group: string;
  version: string;
  namesPlural: string;
  namespace?: string;
  children(props: ICustomResourcesResponse): any;
}

export class WithCustomResources extends React.Component<IWithCustomResourcesProps> {
  public render() {
    return (
      <KubernetesRest url={
        this.props.namespace
          ? `/apis/${this.props.group}/${this.props.version}/namespaces/${this.props.namespace}/${this.props.namesPlural}`
          : `/apis/${this.props.group}/${this.props.version}/${this.props.namesPlural}`
      }>
        {props => this.props.children(props)}
      </KubernetesRest>
    )
  }
}