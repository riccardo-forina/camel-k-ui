import {
  Col,
  ListView,
  Row
} from 'patternfly-react';
import * as React from 'react';
import { ICustomResource } from '../../../kubernetes.models';

export interface ICustomResourcesList {
  resources: ICustomResource[];
}

export class CustomResourcesList extends React.Component<ICustomResourcesList> {
  public render() {
    return (
      <React.Fragment>
        <ListView>
          { this.props.resources.map((resource, index) => (
            <ListView.Item
              key={index}
              leftContent={<ListView.Icon name="gear" />}
              stacked={true}
              heading={resource.metadata.name}
              description={`UID: ${resource.metadata.uid}`}
            >
              <Row>
                <Col sm={11}>
                  <textarea disabled={true}>
                    {JSON.stringify(resource.spec, null, 2)}
                  </textarea>
                </Col>
              </Row>
            </ListView.Item>
          ))}
        </ListView>
      </React.Fragment>
    )
  }
}