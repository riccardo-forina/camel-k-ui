import * as React from 'react';
import { AppContext } from '../AppContext';
import { AuthContext } from '../auth';
import { IRestState, Rest } from './Rest';
import { Stream } from './Stream';


export interface IKubernetesRest {
  contentType?: string;
  poll?: number;
  url: string;
  stream?: boolean;
  children(props: IRestState): any;
}

export class KubernetesRest extends React.Component<IKubernetesRest> {
  public render() {
    const { url, children, stream, ...props } = this.props;
    const handleErrorBodyChildren = (({ data, loading, error, ...rest}: IRestState) =>
      this.props.children({
        data,
        error: (!loading && data && data.code && data.code !== 200) ? true : error,
        loading,
        ...rest
      })
    );

    const RestOrStream = stream ? Stream : Rest;

    return (
      <AppContext.Consumer>
        {({ apiUri }) => (
          <AuthContext.Consumer>
            {({ token }) => (
              <RestOrStream
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
