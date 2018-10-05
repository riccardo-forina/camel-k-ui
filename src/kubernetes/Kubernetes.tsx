import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { CustomResourceDefinitionList } from './crd';
import { KubernetesDirectory } from './KubernetesDirectory';


export class Kubernetes extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path={this.props.match.url} component={KubernetesDirectory} />
        <Route path={`${this.props.match.url}/crd`} component={CustomResourceDefinitionList} />
      </Switch>
    );
  }
}