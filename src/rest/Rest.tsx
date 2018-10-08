import * as React from 'react';

export interface IHeader {
  [s: string]: string;
};

export function makeFetch(
  url: string,
  method: 'GET' | 'POST',
  headers?: IHeader,
  body?: any
) {
  return () => fetch(url, {
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-cache',
    credentials: 'include',
    headers: headers || {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  });
}

export interface IRestState {
  data: any | null;
  error: boolean;
  errorMessage?: string;
  loading: boolean;
  save(data: any): void
}

export interface IRestProps {
  url: string;
  headers?: IHeader;
  children(props: IRestState): any;
}

export class Rest extends React.Component<IRestProps, IRestState> {
  public constructor(props: IRestProps) {
    super(props);
    this.state = {
      data: null,
      error: false,
      loading: true,
      save: makeFetch(this.props.url, 'POST', this.props.headers)
    };
  }

  public async componentWillMount() {
    try {
      const result = await makeFetch(this.props.url, 'GET', this.props.headers)();
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