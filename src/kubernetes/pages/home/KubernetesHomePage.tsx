import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import {
  CustomResourceListPage
} from '../custom-resource/index';


export class KubernetesHomePage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Switch>
        <Redirect exact={true} path={this.props.match.url} to={`${this.props.match.url}/custom-resources`} />
        <Route path={`${this.props.match.url}/custom-resources`} component={CustomResourceListPage} />
      </Switch>
    );
  }
}