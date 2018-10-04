import * as React from 'react';
import { 
  BrowserRouter as Router, 
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
import { 
  Explorer
} from './explorer';

import './App.css';

class App extends React.Component<any, IAuthContext> {
  private TokenWithState: any; 

  public constructor(props: any) {
    super(props);
    this.state = {
      logged: false
    } as IAuthContext;

    this.TokenWithState = (_: any) => (
      <Token to="/explorer" onToken={this.updateToken} />
    );

    this.updateToken = this.updateToken.bind(this);
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={Login} />
            <Route path='/token' render={this.TokenWithState} />
            <AuthenticatedRoute path='/explorer' component={Explorer} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }

  private updateToken(token: string) {
    this.setState({
      logged: !!token,
      token
    });
  }
}

export default App;
