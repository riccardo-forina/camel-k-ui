import * as React from 'react';
import { AppContext } from '../../AppContext';
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
      <AppContext.Consumer>
        {({ apiUri }) => (
          <AuthContext.Consumer>
            {({ token }) => (
              <Rest
                baseUrl={apiUri}
                url={url}
                { ...props}
                headers={{'Authorization': `Bearer ${token}`}}
              />
            )}
          </AuthContext.Consumer>
        )}
      </AppContext.Consumer>
    )
  }
}
