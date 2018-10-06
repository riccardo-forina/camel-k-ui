import * as React from 'react';
import { Link } from 'react-router-dom';
import { AsyncCustomResourceDefinitionsList, AsyncCustomResourcesTable } from './components';
import {
  WithCustomResourceDefinitions,
  WithCustomResources
} from './containers';


export class CustomResourceListPage extends React.Component<{}> {
  public render() {
    return (
      <React.Fragment>
        <ol role="navigation" aria-label="breadcrumbs" className="breadcrumb">
          <li className=""><Link to="/">Home</Link></li>
          <li className=""><Link to="/kubernetes">Kubernetes</Link></li>
          <li className="active"><span>Custom Resource Definitions</span></li>
        </ol>
        <div className={'row row-cards-pf'}>
          <WithCustomResourceDefinitions>
            {crdsResult =>
              <AsyncCustomResourceDefinitionsList {...crdsResult}>
                {customResourceDefinition => (
                  <WithCustomResources crd={customResourceDefinition}>
                    {result => <AsyncCustomResourcesTable {...result} />}
                  </WithCustomResources>
                )}
              </AsyncCustomResourceDefinitionsList>
            }
          </WithCustomResourceDefinitions>
        </div>
      </React.Fragment>
    );
  }
}