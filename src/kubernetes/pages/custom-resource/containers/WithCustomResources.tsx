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
  namesSingular: string;
  namesPlural: string;
  children(props: ICustomResourcesResponse): any;
}

export class WithCustomResources extends React.Component<IWithCustomResourcesProps> {
  public render() {
    return (
      <KubernetesRest
        getUrl={`/apis/${this.props.group}/${this.props.version}/${this.props.namesPlural}`}
        putUrl={`/apis/${this.props.group}/${this.props.version}/${this.props.namesSingular}`}
      >
        {props => this.props.children(props)}
      </KubernetesRest>
    )
  }
}