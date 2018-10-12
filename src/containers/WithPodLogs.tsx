import * as React from 'react';
import { IRestState, KubernetesRest } from './index';

export interface IPodLogsResponse extends IRestState {
  data: string[]
}


export interface IWithPodLogsProps {
  podName: string;
  namespace: string;
  children(props: IPodLogsResponse): any;
}

export class WithPodLogs extends React.Component<IWithPodLogsProps> {
  public render() {
    return (
      <KubernetesRest
        stream={true}
        contentType={'text/plain'}
        url={`/api/v1/namespaces/${this.props.namespace}/pods/${this.props.podName}/log?tailLines=1&follow=true`}>
        {asyncLogs => this.props.children(asyncLogs)}
      </KubernetesRest>
    );
  }
}