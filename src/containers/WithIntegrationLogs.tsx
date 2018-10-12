import * as React from 'react';
import { IPod, KubernetesRest } from './index';

export interface IChildrenProps {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  pod?: IPod;
  logs?: string[];
}

export interface IWithIntegrationLogsProps {
  integrationName: string;
  namespace: string;
  children(props: IChildrenProps): any;
}

export class WithIntegrationLogs extends React.Component<IWithIntegrationLogsProps> {
  public render() {
    return (
      <KubernetesRest
        poll={1000}
        url={`/api/v1/namespaces/${this.props.namespace}/pods?labelSelector=${encodeURIComponent(`camel.apache.org/integration=${this.props.integrationName}`)}&limit=500`}
      >
        {asyncPods =>
          asyncPods.error
            ? this.props.children({
              error: true,
              errorMessage: asyncPods.errorMessage,
              loading: false,
            })
            : asyncPods.loading
              ? this.props.children({
                error: false,
                loading: true,
              })
            : asyncPods.data.items.map((pod: any, index: number) => (
                pod.status.phase === 'Running' ?
                  <KubernetesRest
                    key={index}
                    stream={true}
                    contentType={'text/plain'}
                    url={`/api/v1/namespaces/${this.props.namespace}/pods/${pod.metadata.name}/log?tailLines=1&follow=true`}>
                    {asyncLogs => this.props.children({
                      error: false,
                      loading: false,
                      logs: asyncLogs.data,
                      pod,
                    })}
                  </KubernetesRest>
                  : this.props.children({
                    error: false,
                    loading: false,
                    pod,
                  })
              ))
        }
      </KubernetesRest>
    )
  }
}