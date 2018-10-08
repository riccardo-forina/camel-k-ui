import {
  Masthead,
} from 'patternfly-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { PfNavLink } from '../ui/patternfly';

import typo from './camel.typo.svg';

export interface ILayoutBase extends RouteComponentProps {
  navbar?: any
}

class LayoutBase extends React.Component<ILayoutBase> {

  public render() {
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
          {this.props.navbar}
        </Masthead>
        {this.props.children}
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
