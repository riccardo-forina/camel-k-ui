import {
  DropdownButton,
  EmptyState,
  Filter,
  FormControl,
  ListView,
  MenuItem,
  Sort,
  Toolbar,
} from 'patternfly-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ICustomResource, IProject } from '../../containers';
import { IntegrationsListItem } from './IntegrationsListItem';

export interface IIntegrationsListProps {
  match: any;
  loading: boolean;
  project: string;
  projects: IProject[];
  integrations: ICustomResource[];
  onSaveIntegration(url: string, integration: ICustomResource): void;
  onChangeProject(project: string): void;
}

export interface IIntegrationsListState {
  activeFilters: string[],
  currentFilterType: {
    filterType: string,
    placeholder: string,
  },
  currentSortType: string,
  currentValue: string,
  filterCategory: any,
  isSortAscending: boolean,
}

export class IntegrationsList extends React.Component<IIntegrationsListProps, IIntegrationsListState> {
  public state = {
    activeFilters: [],
    currentFilterType: {
      filterType: '',
      placeholder: ''
    },
    currentSortType: 'name',
    currentValue: '',
    filterCategory: null,
    isSortAscending: true,
  };

  public render() {
    return (
      <React.Fragment>
        <Toolbar>
          <Filter>
            <Filter.TypeSelector
              filterTypes={[{
                filterType: 'text',
                id: 'name',
                placeholder: 'Filter by Name',
                title: 'Name',
              }]}
              currentFilterType={'name'}
              onFilterTypeSelected={null}
            />
            {this.renderInput()}
          </Filter>
          <Sort>
            <Sort.TypeSelector
              sortTypes={[{
                id: 'name',
                isNumeric: false,
                title: 'Name',
              }]}
              currentSortType={'name'}
              onSortTypeSelected={null}
            />
            <Sort.DirectionSelector
              isNumeric={false}
              isAscending={this.state.isSortAscending}
              onClick={null}
            />
          </Sort>
          <div className="form-group">
            <Link
              to={`${this.props.match.url}/new`}
              className={'btn btn-default'}
            >
              New integration
            </Link>
          </div>
          <Toolbar.RightContent>
            <DropdownButton
              id={'namespace-switcher'}
              bsStyle={'primary'}
              title={`Project: ${this.props.project}`}
              pullRight={true}
            >
              {this.props.projects.map((project: IProject, index: number) =>
                <MenuItem
                  key={index}
                  onClick={this.props.onChangeProject.bind(null, project.metadata.name)}
                >
                  {project.metadata.name}
                </MenuItem>
              )}
            </DropdownButton>
          </Toolbar.RightContent>
          <Toolbar.Results>
            {this.props.loading
              ? <div className="spinner" />
              : <h5>{this.props.integrations.length} Results</h5>
            }
            {/*{activeFilters &&
            activeFilters.length > 0 && (
              <Filter.ActiveLabel>Active Filters:</Filter.ActiveLabel>
              <Filter.List>
              {activeFilters.map((item, index) => (
                <Filter.Item key={index} onRemove={this.removeFilter} filterData={item}>
                  label=
                  {item.label}
                </Filter.Item>
              ))}
              </Filter.List>
              <a
              href="#"
              onClick={e => {
              e.preventDefault();
              this.clearFilters();
            }}
              >
              Clear All Filters
              </a>
            }*/}
          </Toolbar.Results>
        </Toolbar>

        <div className="container-fluid">
          <ListView>
            {this.props.integrations.map((integration, index) => (
              <IntegrationsListItem
                integration={integration}
                key={index}
                onSaveIntegration={this.props.onSaveIntegration}
              />
            ))}
          </ListView>

          {!this.props.loading && this.props.integrations.length === 0 && (
            <EmptyState>
              <EmptyState.Icon />
              <EmptyState.Title>There are no integrations</EmptyState.Title>
              <EmptyState.Info>
                We couldn't find any integration under the <strong>{this.props.project}</strong> namespace.
              </EmptyState.Info>
              <EmptyState.Action>
                <Link to={`${this.props.match.url}/new`} className={'btn btn-lg btn-primary'}>Create your first integration</Link>
              </EmptyState.Action>
            </EmptyState>
          )}
        </div>
      </React.Fragment>
    );
  }

  public renderInput = () => {
    const { currentFilterType, currentValue } = this.state;
    if (!currentFilterType) {
      return null;
    }

    return (
      <FormControl
        type={currentFilterType.filterType}
        value={currentValue}
        placeholder={currentFilterType.placeholder}
        onChange={null}
        onKeyPress={null}
      />
    );
  }
}
