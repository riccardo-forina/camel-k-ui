import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import {
  AuthContext,
  AuthenticatedRoute,
  IAuthContext,
  Login,
  Token,
} from './auth';
import { CamelKHomePage } from './camel-k';
import { KubernetesHomePage } from './kubernetes';
import { Layout } from './layout';

import './App.css';
import { PfNavLink } from './ui/patternfly';


const LayoutWithRoutes = () => (
  <Layout>
    {() => ({
      content: (
        <Switch>
          <Redirect exact={true} path='/' to={'/camel-k'} />
          <Route path='/camel-k' component={CamelKHomePage} />
          <Route path='/kubernetes' component={KubernetesHomePage} />
        </Switch>
      ),
      navbar: (
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
      ),
    })}
  </Layout>
);

class App extends React.Component<any, IAuthContext> {
  private TokenWithState: any;

  public constructor(props: any) {
    super(props);
    const token = this.getStoredToken();
    this.state = {
      authorizationUri: 'https://192.168.64.12:8443/oauth/authorize',
      clientId: 'camel-k-ui',
      logged: !!token,
      redirectUri: 'http://localhost:3000/token/',
      responseType: 'token',
      token
    } as IAuthContext;

    this.TokenWithState = () => (
      <Token to='/' onToken={this.updateToken} />
    );

    this.updateToken = this.updateToken.bind(this);
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <Switch>
            <Route path='/token' render={this.TokenWithState} />
            <Route path='/login' component={Login} />
            <AuthenticatedRoute path='/' component={LayoutWithRoutes} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }

  private updateToken(token: string) {
    this.storeToken(token);
    this.setState({
      logged: !!token,
      token
    });
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private storeToken(token: string): void {
    return localStorage.setItem('access_token', token);
  }
}

export default App;
