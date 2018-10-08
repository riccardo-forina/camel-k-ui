import {
  Masthead
} from 'patternfly-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import typo from './camel.typo.svg';

export interface ILayoutBase extends RouteComponentProps {
  children(): { navbar: JSX.Element, content: JSX.Element }
}

class LayoutBase extends React.Component<ILayoutBase> {

  public render() {
    const { navbar, content } = this.props.children();
    return (
      <React.Fragment>
        <Masthead
          thin={true}
          titleImg={typo}
          title="camel-k UI"
          href={'/'}
          navToggle={false}
          onTitleClick={this.goToHome}
        >
          {navbar}
        </Masthead>
        {content}
      </React.Fragment>
    );
  }

  protected goToHome = () => {
    this.props.history.replace('/');
  };

  protected goToKubernetes = () => {
    this.props.history.replace('/kubernetes');
  };

}

export const Layout = withRouter(LayoutBase);
