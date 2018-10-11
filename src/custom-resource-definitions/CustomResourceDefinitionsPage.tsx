import * as React from 'react';
import {
  WithCustomResourceDefinitions,
  WithCustomResources
} from '../containers';
import { AsyncCustomResourceDefinitionsList, AsyncCustomResourcesTable } from './components/index';


export class CustomResourceDefinitionsPage extends React.Component<{}> {
  public render() {
    return (
      <div className={'container-fluid'}>
        <WithCustomResourceDefinitions>
          {crdsResult =>
            <AsyncCustomResourceDefinitionsList {...crdsResult}>
              {crd => (
                <WithCustomResources
                  group={crd.spec.group}
                  version={crd.spec.version}
                  namesPlural={crd.spec.names.plural}
                >
                  {result => <AsyncCustomResourcesTable {...result} />}
                </WithCustomResources>
              )}
            </AsyncCustomResourceDefinitionsList>
          }
        </WithCustomResourceDefinitions>
      </div>
    );
  }
}