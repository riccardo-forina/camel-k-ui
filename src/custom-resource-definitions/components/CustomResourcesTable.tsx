import {
  Table
} from 'patternfly-react';
import * as React from 'react';
import { ICustomResource } from '../../containers/kubernetes.models';

const headerFormat = (value: any) => <Table.Heading>{value}</Table.Heading>;
const cellFormat = (value: any) => <Table.Cell>{value}</Table.Cell>;

export interface ICustomResourcesTable {
  resources: ICustomResource[];
}

export class CustomResourcesTable extends React.Component<ICustomResourcesTable> {
  public render() {
    return (
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
          <Table.Body
            rows={this.props.resources.map(resource => resource.metadata)}
            rowKey={'uid'}
          />
        </Table.PfProvider>
      </React.Fragment>
    )
  }
}