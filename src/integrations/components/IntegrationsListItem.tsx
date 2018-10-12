import {
  Grid,
  ListView,
} from 'patternfly-react';import * as React from 'react';
import { ICustomResource, IPod, WithPodLogs } from '../../containers';
import { Editor, LogViewer } from '../../ui';

export function specLanguageMapper(language: string) {
  const langsMap = {
    'js': 'javascript',
  };
  return langsMap[language] || null;
}

export function makeSaveFunction(
  save: (url: string, integration: ICustomResource) => void,
  item: ICustomResource) {
  return (content: string) => {
    const newItem: ICustomResource = { ...item};
    newItem.spec.source.content = content;
    save(newItem.metadata.selfLink, newItem);
  }
}

export interface IIntegrationsListItemProps {
  integration: ICustomResource;
  pods: IPod[];
  onSaveIntegration(url: string, integration: ICustomResource): void;
}

export interface IIntegrationsListItemState {
  expanded: boolean;
  expandedProp: string | null;
}

export class IntegrationsListItem extends React.Component<IIntegrationsListItemProps, IIntegrationsListItemState> {
  public state = {
    expanded: false,
    expandedProp: null
  };

  public render() {
    return (
      <ListView.Item
        actions={<div/>}
        additionalInfo={[
          <ListView.InfoItem key={1}>
            <ListView.Expand
              expanded={this.state.expanded && this.state.expandedProp === 'source'}
              toggleExpanded={this.toggleExpanded.bind(null, 'source')}
            >
              <strong>{this.props.integration.spec.source.language}</strong>
              <span>Language</span>
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key={2}>
            <ListView.Expand
              expanded={this.state.expanded && this.state.expandedProp === 'logs'}
              toggleExpanded={this.toggleExpanded.bind(null, 'logs')}
            >
              <span className="pficon pficon-info" />
              <strong>{this.props.pods.length}</strong>
              Pod{this.props.pods.length > 1 ? 's' : ''}
            </ListView.Expand>
          </ListView.InfoItem>,
        ]}
        compoundExpand={true}
        compoundExpanded={this.state.expanded}
        description={'Created: ' + new Date(this.props.integration.metadata.creationTimestamp).toLocaleString()}
        heading={this.props.integration.metadata.name}
        hideCloseIcon={true}
        leftContent={<ListView.Icon name={'gear'} />}
        onCloseCompoundExpand={this.closeExpanded}
        stacked={true}
      >
        {this.state.expandedProp === 'source' && (
          <Grid.Row>
            <Grid.Col sm={12}>
              <Editor
                language={specLanguageMapper(this.props.integration.spec.source.language)}
                spec={this.props.integration.spec.source.content}
                onSave={makeSaveFunction(this.props.onSaveIntegration, this.props.integration)}
              />
            </Grid.Col>
          </Grid.Row>
        )}
        {this.state.expandedProp === 'logs' && (
          this.props.pods.filter(pod => pod.status.phase === 'Running').map(pod => (
            <WithPodLogs
              key={pod.metadata.uid}
              namespace={this.props.integration.metadata.namespace}
              podName={pod.metadata.name}
            >
              {({data}) =>
                <React.Fragment>
                  <h2>Pod: {pod.metadata.name} ({pod.status.phase})</h2>
                  <LogViewer data={data || []} />
                </React.Fragment>
              }
            </WithPodLogs>
          ))

        )}
      </ListView.Item>
    )
  }

  public pushLogs = (pod: IPod, data: string[]) => {
    return null;
  };

  public toggleExpanded = (expandedProp: string) => {
    const expanded =
      !this.state.expandedProp || this.state.expandedProp === expandedProp
        ? !this.state.expanded
        : this.state.expanded;
    this.setState({
      expanded,
      expandedProp: expanded ? expandedProp : null
    });
  };

  public closeExpanded = () => {
    this.setState({
      expanded: false,
      expandedProp: null
    });
  };
}