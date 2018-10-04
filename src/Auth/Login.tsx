import * as React from 'react';

const config = {
	authorization: 'https://192.168.64.12:8443/oauth/authorize',
	client_id: 'camel-k-ui',
  redirect_uri: 'http://localhost:3000/token/',
  response_type: 'token'
};

export class Login extends React.Component<{}> {
  public componentWillMount() {
    const authUrl = `${config.authorization}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=${config.response_type}`;
    window.location.href = authUrl;
  }

  public render() {
    return (
      <p>Redirect to auth...</p>
    )
  }
}