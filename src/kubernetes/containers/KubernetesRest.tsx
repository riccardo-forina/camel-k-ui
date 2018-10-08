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
    const { url, children, ...props } = this.props;
    const handleErrorBodyChildren = (({ data, loading, error, ...rest}: IRestState) =>
      this.props.children({
        data,
        error: (!loading && data && data.code && data.code !== 200) ? true : error,
        loading,
        ...rest
      })
    );
    return (
      <AppContext.Consumer>
        {({ apiUri }) => (
          <AuthContext.Consumer>
            {({ token }) => (
              <Rest
                baseUrl={apiUri}
                url={url}
                children={handleErrorBodyChildren}
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
