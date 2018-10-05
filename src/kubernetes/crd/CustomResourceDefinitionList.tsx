import * as React from 'react';
import { IRestState } from '../../rest';
import { KubernetesRest } from '../KubernetesRest';

interface ICustomResourceDefinitionList {
  classes: any;
}

interface ICustomResponseDefinitionItem {
  metadata: {
    name: string,
    selfLink: string,
    uid: string,
    resourceVersion: string,
    generation: number,
    creationTimestamp: string
  },
  spec: {
    group: string,
    version: string,
    names: {
      plural: string,
      singular: string,
      kind: string,
      listKind: string,
    },
    scope: string,
    validation: {
      openAPIV3Schema: {
        properties: {
          spec: {
            properties: {
              replicas: {
                type: string,
                maximum: number,
                minimum: number
              }
            }
          }
        }
      }
    }
  },
  status: {
    conditions: Array<{
      type: string,
      status: string,
      lastTransitionTime: string,
      reason: string,
      message: string,
    }>,
    acceptedNames: {
      plural: string,
      singular: string,
      kind: string,
      listKind: string,
    }
  }
}

interface ICustomResponseDefinitionResponse extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: ICustomResponseDefinitionItem[];
  }
}

export class CustomResourceDefinitionList extends React.Component<ICustomResourceDefinitionList> {
  public render() {
    return (
      <div className={'row row-cards-pf'}>
        <KubernetesRest
          url={'/apis/apiextensions.k8s.io/v1beta1/customresourcedefinitions'}
          method={'GET'}
        >
          {({ loading, error, data }: ICustomResponseDefinitionResponse) => (
            <React.Fragment>
              <p>
                { loading ? 'Loading' : 'Loaded'}
              </p>
              <pre>
                {JSON.stringify(data)}
              </pre>
            </React.Fragment>
          )}
        </KubernetesRest>
      </div>
    );
  }
}