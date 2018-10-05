import {
  Card,
  CardBody,
  CardGrid,
  CardTitle,
} from 'patternfly-react';
import * as React from 'react';
import {
  Link,
  RouteComponentProps
} from 'react-router-dom';

export class KubernetesDirectory extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <React.Fragment>
        <ol role="navigation" aria-label="breadcrumbs" className="breadcrumb">
          <li className=""><Link to="/">Home</Link></li>
          <li className="active"><span>Kubernetes</span></li>
        </ol>
        <div className="cards-pf">
          <CardGrid>
            <CardGrid.Row style={{ marginBottom: '20px', marginTop: '20px' }}>
              <CardGrid.Col xs={6} sm={3} md={3}>
                <Card accented={true} aggregated={true}>
                  <CardTitle>
                    <Link to={`${this.props.match.url}/crd`}>
                      Custom Resources
                    </Link>
                  </CardTitle>
                  <CardBody>
                    A custom resource is an extension of the Kubernetes API that
                    is not necessarily available on every Kubernetes cluster.
                    In other words, it represents a customization of a particular
                    Kubernetes installation.
                  </CardBody>
                </Card>
              </CardGrid.Col>
            </CardGrid.Row>
          </CardGrid>
        </div>
      </React.Fragment>
    )
  }
}
