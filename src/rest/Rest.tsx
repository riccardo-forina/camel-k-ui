import * as React from 'react';

export interface IHeader {
  [s: string]: string;
};

export function callFetch(
  url: string,
  method: 'GET' | 'PUT',
  headers?: IHeader,
  body?: any
) {
  return fetch(url, {
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers
    },
    method,
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
  save(url:string, data: any): void
}

export interface IRestProps {
  baseUrl: string;
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
      save: this.onSave
    };
  }

  public async componentWillMount() {
    this.read();
  }

  public render() {
    return this.props.children(this.state);
  }

  public read = async () => {
    try {
      const result = await callFetch(`${this.props.baseUrl}${this.props.url}`, 'GET', this.props.headers);
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
      throw new Error(e.message);
    }
  }

  public onSave = async (url: string, data: any) => {
    this.setState({
      loading: true
    })
    try {
      await callFetch(`${this.props.baseUrl}${url}`, 'PUT', this.props.headers, data);
      await this.read();
    } catch(e) {
      this.setState({
        error: true,
        errorMessage: e.message,
        loading: false,
      });
    }
  }
}