import * as React from 'react';
import { IProject, IRestState, KubernetesRest } from './index';


export interface IProjectsResponse extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: IProject[];
  }
}


export interface IWithProjectsProps {
  children(props: IProjectsResponse): any;
}

export class WithProjects extends React.Component<IWithProjectsProps> {
  public render() {
    return (
      <KubernetesRest url={'/apis/project.openshift.io/v1/projects'}>
        {props => this.props.children(props)}
      </KubernetesRest>
    )
  }
}