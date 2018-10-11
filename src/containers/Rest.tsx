import * as React from 'react';

export interface IHeader {
  [s: string]: string;
};

export interface IFetch {
  url: string,
  method: 'GET' | 'PUT',
  headers?: IHeader,
  body?: any,
  contentType?: string
}

export function callFetch({
  url,
  method,
  headers = {},
  body,
  contentType = 'application/json; charset=utf-8'
}: IFetch) {
  return fetch(url, {
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': contentType,
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
  contentType?: string;
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

  public async componentDidUpdate(prevProps: IRestProps) {
    if (prevProps.url !== this.props.url) {
      this.read();
    }
  }

  public render() {
    return this.props.children(this.state);
  }

  public read = async () => {
    try {
      const result = await callFetch({
        contentType: this.props.contentType,
        headers: this.props.headers,
        method: 'GET',
        url: `${this.props.baseUrl}${this.props.url}`,
      });
      let data;
      if (!this.props.contentType || this.props.contentType.indexOf('application/json') === 0) {
        data = await result.json();
      } else {
        data = await result.text();
      }
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

  public onSave = async (url: string, data: any) => {
    this.setState({
      loading: true
    })
    try {
      await callFetch({
        body: data,
        contentType: this.props.contentType,
        headers: this.props.headers,
        method: 'PUT',
        url: `${this.props.baseUrl}${url}`,
      });
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