import {
  Masthead,
  VerticalNav
} from 'patternfly-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { PfNavLink } from '../ui/patternfly';

import pitto from './camel.pitto.svg';
import typo from './camel.typo.svg';

export interface ILayoutBase extends RouteComponentProps {
  navbar?: any
}

class LayoutBase extends React.Component<ILayoutBase> {

  public render() {
    return (
      <React.Fragment>
        <VerticalNav sessionKey={'mainNav'}>
          <VerticalNav.Masthead
            iconImg={pitto}
            titleImg={typo}
            title='camel-k UI'
            href={'/'}
            onTitleClick={this.goToHome}
          >
            <Masthead.Collapse>
              <Masthead.Dropdown
                id="app-user-dropdown"
                title={[
                  <span className="dropdown-title" key="dropdown-title">
                  Settings
                </span>
                ]}
              >
                <PfNavLink to={'/settings'} label={'Change server'} />
                <PfNavLink to={'/logout'} label={'Logout'} />
              </Masthead.Dropdown>
            </Masthead.Collapse>
          </VerticalNav.Masthead>
          {this.props.navbar}
        </VerticalNav>
        <div className='container-pf-nav-pf-vertical'>
          {this.props.children}
        </div>
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
