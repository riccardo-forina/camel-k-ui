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
import { HomePage } from './kubernetes';
import { Layout } from './layout';

import './App.css';

const LayoutWithRoutes = () => (
  <Layout>
    <Switch>
      <Redirect exact={true} path='/' to={'/kubernetes'} />
      <Route path='/kubernetes' component={HomePage} />
    </Switch>
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
      <Token to="/" onToken={this.updateToken} />
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
