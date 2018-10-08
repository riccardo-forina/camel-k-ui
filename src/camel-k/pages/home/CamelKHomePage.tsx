import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { IntegrationsPage } from '../integrations/IntegrationsPage';


export class CamelKHomePage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path={this.props.match.url} component={IntegrationsPage} />
      </Switch>
    );
  }
}