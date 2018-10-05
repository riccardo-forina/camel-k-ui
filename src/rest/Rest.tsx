import * as React from 'react';

export interface IRestState {
  data: any | null;
  error: boolean;
  errorMessage?: string;
  loading: boolean;
}

export interface IRestProps {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: any,
  headers?: { [s: string]: string; };
  children(props: IRestState): JSX.Element;
}

export class Rest extends React.Component<IRestProps, IRestState> {
  public state = {
    data: null,
    error: false,
    loading: true,
  };

  public async componentWillMount() {
    try {
      const result = await fetch(this.props.url, {
        body: this.props.body ? JSON.stringify(this.props.body) : undefined,
        cache: 'no-cache',
        credentials: 'include',
        headers: this.props.headers || {
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: this.props.method,
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      });
      const data = await result.json();
      this.setState({
        data,
        loading: false,
      });
    } catch(e) {
      this.setState({
        error: true,
        errorMessage: e.message,
        loading: false,
      });
    }
  }

  public render() {
    return this.props.children(this.state);
  }
}