import {
  VerticalNav
} from 'patternfly-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import pitto from './camel.pitto.svg';
import typo from './camel.typo.svg';

class LayoutBase extends React.Component<RouteComponentProps> {

  public render() {
    return (
      <div style={{
        position: 'relative',
        zIndex: 0,
      }}>
        <div style={{
          height: '100vh',
          paddingTop: '60px',
          transform: 'translateZ(0px)',
        }}>
          <div className="layout-pf layout-pf-fixed">
            <VerticalNav sessionKey={'mainMenu'}>
              <VerticalNav.Masthead
                iconImg={pitto}
                titleImg={typo}
                title="camel-k UI"
                href={'/'}
                navToggle={true}
                onTitleClick={this.goToHome}
              />
              <VerticalNav.Item
                title={'Kubernetes'}
                iconClass="fa fa-server"
                onClick={this.goToKubernetes}
              />
            </VerticalNav>
            <main className={"container-fluid container-cards-pf container-pf-nav-pf-vertical nav-pf-persistent-secondary "}>
              {this.props.children}
            </main>
          </div>
        </div>
      </div>
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
