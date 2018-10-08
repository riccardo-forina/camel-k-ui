import * as React from 'react';
import { ICustomResource, KubernetesRest } from '../../..';
import { IRestState } from '../../../../rest';


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
  children(props: ICustomResourcesResponse): any;
}

export class WithCustomResources extends React.Component<IWithCustomResourcesProps> {
  public render() {
    return (
      <KubernetesRest url={`/apis/${this.props.group}/${this.props.version}/${this.props.namesPlural}`}>
        {props => this.props.children(props)}
      </KubernetesRest>
    )
  }
}