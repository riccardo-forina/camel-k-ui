import * as React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';
import { AppContext, IAppContext, IAppSettings } from './AppContext';
import {
  AuthContext,
  AuthenticatedRoute,
  IAuthContext,
  LoginPage,
  Logout,
  TokenPage,
} from './auth';
import { CustomResourceDefinitionsPage } from './custom-resource-definitions';
import { IntegrationsPage } from './integrations';
import { Layout } from './layout';

import './App.css';
import { SettingsPage } from './settings';
import { PfVerticalNavItem } from './ui/patternfly';

const PrivateRoutes = () => (
  <Switch>
    <Redirect exact={true} path='/' to={'/integrations'} />
    <Route path='/integrations' component={IntegrationsPage} />
    <Route path='/crd' component={CustomResourceDefinitionsPage} />
  </Switch>
);

const WiredLogout = () => (
 <AppContext.Consumer>
    {({ logout }) => (
      <Logout logout={logout} />
    )}
  </AppContext.Consumer>
);

interface IAppState extends IAuthContext, IAppContext {
  firstSetup: boolean;
  lastUsedProject?: string;
}

class App extends React.Component<RouteComponentProps, IAppState> {
  private TokenWithState: any;

  public constructor(props: any) {
    super(props);
    const token = this.getPersistedValue('access_token');
    this.state = {
      apiUri: this.getPersistedValue('apiUri') || '',
      authorizationUri: this.getPersistedValue('authorizationUri') || '',
      clientId: 'camel-k-ui',
      firstSetup: this.getPersistedValue('setupDone') === null,
      lastUsedProject: this.getPersistedValue('lastUsedProject') || 'default',
      logged: !!token,
      logout: this.logout,
      redirectUri: document.location!.origin + '/token',
      responseType: 'token',
      saveSettings: this.saveSettings,
      token
    } as IAppState;

    this.TokenWithState = () => (
      <TokenPage to='/' onToken={this.updateToken} />
    );

    if (this.state.firstSetup) {
      this.props.history.replace('/settings');
    }
  }

  public render() {
    return (
      <AppContext.Provider value={this.state}>
        <AuthContext.Provider value={this.state}>
          <Layout navbar={this.renderNavbar()}>
            <React.Fragment>
              <Switch>
                <Route path='/token' render={this.TokenWithState} />
                <Route path='/login' component={LoginPage} />
                <Route path='/logout' component={WiredLogout} />
                <Route path='/settings' component={SettingsPage} />
                <AuthenticatedRoute path='/' component={PrivateRoutes} />
              </Switch>
            </React.Fragment>
          </Layout>
        </AuthContext.Provider>
      </AppContext.Provider>
    );
  }

  public renderNavbar() {
    return [
      <PfVerticalNavItem
        icon={'server'}
        to={'/integrations'}
        label={'Integrations'}
        key={1}
      />,
      <PfVerticalNavItem
        icon={'sitemap'}
        to={'/crd'}
        label={'Custom Resource Definitions'}
        key={2}
      />,
    ];
  }

  private updateToken = (token: string) => {
    this.storeToken(token);
    this.setState({
      logged: !!token,
      token
    });
  };

  private storeToken = (token: string): void => {
    return localStorage.setItem('access_token', token);
  };

  private saveSettings = (settings: IAppSettings): void => {
    const state = {
      ...settings,
      firstSetup: false,
      logged: false,
      token: null
    };
    this.setState(state);
    localStorage.setItem('apiUri', state.apiUri);
    localStorage.setItem('authorizationUri', state.authorizationUri);
    localStorage.setItem('setupDone', `${Date.now()}`);
    this.props.history.replace('/login');
  };

  private getPersistedValue = (property: string): string | null => {
    return localStorage.getItem(property);
  };

  private logout = (): void => {
    this.setState({
      logged: false,
      token: null
    });
    this.props.history.replace('/');
  }
}

export default withRouter(App);
