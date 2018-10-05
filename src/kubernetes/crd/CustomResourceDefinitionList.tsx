import {
  Col,
  ListView,
  Row
} from 'patternfly-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
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
      <React.Fragment>
        <ol role="navigation" aria-label="breadcrumbs" className="breadcrumb">
          <li className=""><Link to="/">Home</Link></li>
          <li className=""><Link to="/kubernetes">Kubernetes</Link></li>
          <li className="active"><span>Custom Resource Definitions</span></li>
        </ol>
        <div className={'row row-cards-pf'}>
          <KubernetesRest
            url={'/apis/apiextensions.k8s.io/v1beta1/customresourcedefinitions'}
            method={'GET'}
          >
            {({ loading, error, data }: ICustomResponseDefinitionResponse) =>
              loading
                ? <div className="spinner" />
                : (
                  <React.Fragment>
                    <ListView>
                      { data.items.map((item, index) => (
                        <ListView.Item
                          key={index}
                          leftContent={<ListView.Icon name="gear" />}
                          stacked={true}
                          heading={item.metadata.name}
                          description={`UID: ${item.metadata.uid}`}
                        >
                          <Row>
                            <Col sm={11}>
                              <pre>{JSON.stringify(item.spec, null, 2)}</pre>
                            </Col>
                          </Row>
                        </ListView.Item>
                      ))}
                    </ListView>
                  </React.Fragment>
                )
            }
          </KubernetesRest>
        </div>
      </React.Fragment>
    );
  }
}