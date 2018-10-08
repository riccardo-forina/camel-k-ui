import * as React from 'react';
import { AuthContext } from '../../auth/index';
import { IRestProps, Rest } from '../../rest/index';


export class KubernetesRest extends React.Component<IRestProps> {
  public render() {
    const { getUrl, putUrl, ...props } = this.props;
    return (
      <AuthContext.Consumer>
        {({ token }) => (
          <Rest
            getUrl={`https://192.168.64.12:8443${getUrl}`}
            putUrl={`https://192.168.64.12:8443${putUrl}`}
            { ...props}
            headers={{'Authorization': `Bearer ${token}`}}
          />
        )}
      </AuthContext.Consumer>
    )
  }
}
