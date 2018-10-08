import { Button, ListView } from 'patternfly-react';
import * as React from 'react';
import { ICustomResource } from '../../../kubernetes.models';

export interface ICustomResourcesList {
  resources: ICustomResource[];
  children(customResource: ICustomResource): any
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
              hideCloseIcon={true}
              stacked={true}
              heading={resource.metadata.name}
              description={`UID: ${resource.metadata.uid}`}
              additionalInfo={[
                <ListView.InfoItem key={'status'}>
                  <span className={'pficon pficon-container-node'} />
                  {resource.status.phase}
                </ListView.InfoItem>,
                <ListView.InfoItem key={'uptime'}>
                  <span className={'pficon pficon-asleep'} />
                  {new Date(resource.metadata.creationTimestamp).toLocaleString()}
                </ListView.InfoItem>,
              ]}
              actions={<Button>Edit</Button>}
            >
              { this.props.children(resource) }
            </ListView.Item>
          ))}
        </ListView>
      </React.Fragment>
    )
  }
}