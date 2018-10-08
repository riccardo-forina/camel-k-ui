import * as React from 'react';
import { AuthContext } from '../../auth/index';
import { IRestState, Rest } from '../../rest/index';


export interface IKubernetesRest {
  url: string;
  children(props: IRestState): any;
}

export class KubernetesRest extends React.Component<IKubernetesRest> {
  public render() {
    const { url, ...props } = this.props;
    return (
      <AuthContext.Consumer>
        {({ token }) => (
          <Rest
            baseUrl={`https://192.168.64.12:8443`}
            url={url}
            { ...props}
            headers={{'Authorization': `Bearer ${token}`}}
          />
        )}
      </AuthContext.Consumer>
    )
  }
}
