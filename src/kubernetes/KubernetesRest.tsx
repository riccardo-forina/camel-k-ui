import * as React from 'react';
import { AuthContext } from '../auth';
import { IRestProps, Rest } from "../rest";


export class KubernetesRest extends React.Component<IRestProps> {
  public render() {
    const { url, ...props } = this.props;
    return (
      <AuthContext.Consumer>
        {({ token }) => (
          <Rest url={`https://192.168.64.12:8443${url}`} { ...props} headers={{'Authorization': `Bearer ${token}`}} />
        )}
      </AuthContext.Consumer>
    )
  }
}
