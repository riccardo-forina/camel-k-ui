import {
  Col,
  ListView,
  Row,
  Table
} from 'patternfly-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ICustomResource, ICustomResourceDefinition } from '../';
import { IRestState } from '../../rest';
import { KubernetesRest } from '../KubernetesRest';

interface ICustomResourceDefinitionResponse extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: ICustomResourceDefinition[];
  }
}

interface ICustomResourceResponse extends IRestState {
  data: {
    kind: string;
    apiVersion: string;
    metadata: {
      selfLink: string;
      resourceVersion: string;
    };
    items: ICustomResource[];
  }
}

const headerFormat = (value: any) => <Table.Heading>{value}</Table.Heading>;
const cellFormat = (value: any) => <Table.Cell>{value}</Table.Cell>;

export class CustomResourceList extends React.Component<{}> {
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
            {({ loading, error, data }: ICustomResourceDefinitionResponse) =>
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
                              <KubernetesRest
                                url={`/apis/${item.spec.group}/${item.spec.version}/${item.spec.names.plural}`}
                                method={'GET'}
                              >
                                {(result: ICustomResourceResponse) =>
                                  result.loading
                                    ? <div className="spinner" />
                                    : (
                                      <React.Fragment>
                                        <Table.PfProvider
                                          striped={true}
                                          bordered={true}
                                          hover={true}
                                          columns={[
                                            {
                                              cell: {
                                                formatters: [cellFormat],
                                              },
                                              header: {
                                                formatters: [headerFormat],
                                                label: 'Name',
                                              },
                                              property: 'name'
                                            }, {
                                              cell: {
                                                formatters: [cellFormat],
                                              },
                                              header: {
                                                formatters: [headerFormat],
                                                label: 'Age',
                                              },
                                              property: 'creationTimestamp'
                                            },
                                          ]}
                                        >
                                          <Table.Header />
                                          <Table.Body rows={
                                            result.data.items.map(resource => resource.metadata)
                                          } rowKey="id" />
                                        </Table.PfProvider>
                                      </React.Fragment>
                                    )
                                }
                              </KubernetesRest>
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