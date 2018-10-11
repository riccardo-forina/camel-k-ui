import * as React from 'react';
import { WithCustomResources, WithProjects } from '../containers';
import { IntegrationsList } from './components/IntegrationsList';

export interface IIntegrationsPageState {
  project: string;
}

export class IntegrationsPage extends React.Component<{}, IIntegrationsPageState> {
  public state = {
    project: 'default'
  };

  public render() {
    return (
      <WithProjects>
        {asyncProjects =>
          !(asyncProjects.loading || asyncProjects.error) ? (
            <WithCustomResources
              group={'camel.apache.org'}
              version={'v1alpha1'}
              namesPlural={'integrations'}
              namespace={this.state.project}
            >
              {asyncIntegrations => (
                <IntegrationsList
                  loading={asyncIntegrations.loading}
                  project={this.state.project}
                  projects={asyncProjects.data.items}
                  integrations={asyncIntegrations.data ? asyncIntegrations.data.items : []}
                  onSaveIntegration={asyncIntegrations.save}
                  onChangeProject={this.setNamespace}
                />
              )}
            </WithCustomResources>
          ) : <div className="spinner"/>
        }
      </WithProjects>
    );
  }

  public setNamespace = (project: string) => {
    this.setState({
      project
    });
  }
}
