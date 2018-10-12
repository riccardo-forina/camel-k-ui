import * as React from 'react';
import { IRestState, KubernetesRest } from './index';


interface IIntegrationLogsResponse extends IRestState {
  data: string[]
}


export interface IWithIntegrationLogsProps {
  integrationName: string;
  namespace: string;
  children(props: IIntegrationLogsResponse): any;
}

export class WithIntegrationLogs extends React.Component<IWithIntegrationLogsProps> {
  public render() {
    return (
      <KubernetesRest url={`/api/v1/namespaces/${this.props.namespace}/pods?labelSelector=${encodeURIComponent(`camel.apache.org/integration=${this.props.integrationName}`)}&limit=500`} >
        {asyncPods =>
          asyncPods.error
            ? this.props.children(asyncPods)
            : asyncPods.loading
              ? this.props.children(asyncPods)
            : (
                <KubernetesRest
                  stream={true}
                  contentType={'text/plain'}
                  url={`/api/v1/namespaces/${this.props.namespace}/pods/${asyncPods.data.items[0].metadata.name}/log?tailLines=1&follow=true`}>
                  {asyncLogs => this.props.children(asyncLogs)}
                </KubernetesRest>
              )
        }
      </KubernetesRest>
    )
  }
}