import * as React from 'react';
import { Redirect } from 'react-router-dom';

export interface ITokenProps {
  to: string;
  onToken(token: string | null): void
}

export class Token extends React.Component<ITokenProps> {
  public componentWillMount() {
    // // eslint-disable-next-line
    const hash = document.location!.hash;
    const searchParams = new URLSearchParams(hash.substring(1));
    this.props.onToken(
      searchParams.get('access_token')
    );
  }

  public render() {
    return (
      <Redirect to={this.props.to} />
    )
  }
}