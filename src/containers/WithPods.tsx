import * as React from 'react';
import { IPod, IRestState, KubernetesRest } from './index';

export interface IPodsResponse extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: IPod[];
  }
}

export interface IWithPodsProps {
  integrationName: string;
  namespace: string;
  children(props: IPodsResponse): any;
}

export class WithPods extends React.Component<IWithPodsProps> {
  public render() {
    return (
      <KubernetesRest
        poll={1000}
        url={`/api/v1/namespaces/${this.props.namespace}/pods?labelSelector=${encodeURIComponent(`camel.apache.org/integration=${this.props.integrationName}`)}&limit=500`}
      >
        {props => this.props.children(props)}
      </KubernetesRest>
    )
  }
}