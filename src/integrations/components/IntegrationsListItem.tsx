import {
  Grid,
  ListView,
} from 'patternfly-react';import * as React from 'react';
import { ICustomResource, WithIntegrationLogs } from '../../containers';
import { Editor } from '../../ui';

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
              <span className="pficon pficon-blueprint" />
              {this.props.integration.spec.source.language}
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key={2}>
            <ListView.Expand
              expanded={this.state.expanded && this.state.expandedProp === 'logs'}
              toggleExpanded={this.toggleExpanded.bind(null, 'logs')}
            >
              <span className="pficon pficon-info" />
              Logs
            </ListView.Expand>
          </ListView.InfoItem>,
        ]}
        compoundExpand={true}
        compoundExpanded={this.state.expanded}
        description={'Created: ' + new Date(this.props.integration.metadata.creationTimestamp).toLocaleString()}
        heading={this.props.integration.metadata.name}
        hideCloseIcon={false}
        leftContent={<ListView.Icon name={'gear'} />}
        onCloseCompoundExpand={this.closeExpanded}
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
          <WithIntegrationLogs
            namespace={this.props.integration.metadata.namespace}
            integrationName={this.props.integration.metadata.name}
          >
            {(asyncLogs) =>
              <textarea
                value={asyncLogs.data}
                disabled={true}
                style={{
                  background: '#333',
                  color: '#fafafa',
                  fontFamily: 'monospace',
                  height: '100%',
                  minHeight: '600px',
                  width: '100%',
                }}
              />
            }
          </WithIntegrationLogs>
        )}
      </ListView.Item>
    )
  }

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