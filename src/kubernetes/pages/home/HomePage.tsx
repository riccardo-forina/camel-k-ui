import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import {
  CustomResourceListPage
} from '../custom-resource/index';
import { KubernetesDirectory } from './components/KubernetesDirectory';


export class HomePage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path={this.props.match.url} component={KubernetesDirectory} />
        <Route path={`${this.props.match.url}/custom-resources`} component={CustomResourceListPage} />
      </Switch>
    );
  }
}