import {
  Col,
  ListView,
  Row,
} from 'patternfly-react';
import * as React from 'react';
import { ICustomResourceDefinition } from '../../containers/kubernetes.models';

export interface ICustomResourceDefinitionsListProps {
  customResourceDefinitions: ICustomResourceDefinition[],
  children(customResourceDefinition: ICustomResourceDefinition): any
}

export class CustomResourceDefinitionsList extends React.Component<ICustomResourceDefinitionsListProps> {
  public render() {
    return (
      <React.Fragment>
        <ListView>
          { this.props.customResourceDefinitions.map((item, index) => (
            <ListView.Item
              key={index}
              leftContent={<ListView.Icon name="gear" />}
              stacked={true}
              heading={item.metadata.name}
              description={`UID: ${item.metadata.uid}`}
            >
              <Row>
                <Col sm={11}>
                  { this.props.children(item) }
                </Col>
              </Row>
            </ListView.Item>
          ))}
        </ListView>
      </React.Fragment>
    )
  }
}