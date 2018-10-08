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
  Login,
  TokenPage,
} from './auth';
import { CamelKHomePage } from './camel-k';
import { KubernetesHomePage } from './kubernetes';
import { Layout } from './layout';

import './App.css';
import { SettingsPage } from './settings';
import { PfNavLink } from './ui/patternfly';

const PrivateRoutes = () => (
  <Switch>
    <Redirect exact={true} path='/' to={'/camel-k'} />
    <Route path='/camel-k' component={CamelKHomePage} />
    <Route path='/kubernetes' component={KubernetesHomePage} />
  </Switch>
);

interface IAppState extends IAuthContext, IAppContext {
  firstSetup: boolean;
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
      logged: !!token,
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
          <Layout navbar={
            this.state.logged ? (
              <ul className='persistent-secondary nav navbar-nav navbar-primary'>
                <PfNavLink to={'/camel-k'} label={'Camel-k'}>
                  <ul className="nav navbar-nav navbar-persistent">
                    <PfNavLink to={'/camel-k'} label={'Integrations'} />
                  </ul>
                </PfNavLink>
                <PfNavLink to={'/kubernetes'} label={'Kubernetes'}>
                  <ul className="nav navbar-nav navbar-persistent">
                    <PfNavLink to={'/kubernetes/custom-resources'} label={'Custom Resources'} />
                  </ul>
                </PfNavLink>
              </ul>
            ) : null
          }>
            <React.Fragment>
              <Switch>
                <Route path='/token' render={this.TokenWithState} />
                <Route path='/login' component={Login} />
                <Route path='/settings' component={SettingsPage} />
                <AuthenticatedRoute path='/' component={PrivateRoutes} />
              </Switch>
            </React.Fragment>
          </Layout>
        </AuthContext.Provider>
      </AppContext.Provider>
    );
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
}

export default withRouter(App);
