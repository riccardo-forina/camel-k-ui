import * as React from 'react';
import { 
  Redirect,
  Route, 
} from 'react-router-dom';
import { 
  AuthContext, 
} from '.';

export class AuthenticatedRoute extends React.Component<any> {
  private Component: any;
  public constructor(props: any) {
    super(props);

    const { component: Component, ...componentProps } = props;
    this.Component = () => (
      <AuthContext.Consumer>
        {({ logged }) => (
          logged 
            ? <Component {...componentProps} />
            : <Redirect to={'/'} />
        )}
      </AuthContext.Consumer>
    );
  }
  public render() {
    const { component, ...props} = this.props;
    return (
      <Route {...props} children={this.Component} />
    );
  }
}