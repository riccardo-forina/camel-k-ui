import {
  Col,
  DropdownButton,
  Filter,
  FormControl,
  MenuItem,
  Row,
  Sort,
  Toolbar,
} from 'patternfly-react';
import * as React from 'react';
import { ICustomResource, IProject } from '../../containers';
import { CustomResourcesList } from '../../custom-resource-definitions/components';
import { Editor } from '../../ui';

export function specLanguageMapper(language: string) {
  const langsMap = {
    'js': 'javascript',
  };
  return langsMap[language] || null;
}

export function makeSaveFunction(
  save: (url: string, integration: ICustomResource) => void,
  item: ICustomResource) {
  return (content: string) => {
    const newItem: ICustomResource = { ...item};
    newItem.spec.source.content = content;
    save(newItem.metadata.selfLink, newItem);
  }
}

export interface IIntegrationsListProps {
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
          <Toolbar.RightContent>
            <DropdownButton title={`Project: ${this.props.project}`} pullRight={true}>
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
          <CustomResourcesList resources={this.props.integrations}>
            {(resource) => (
              <Row>
                <Col sm={12}>
                  <Editor
                    language={specLanguageMapper(resource.spec.source.language)}
                    spec={resource.spec.source.content}
                    onSave={makeSaveFunction(this.props.onSaveIntegration, resource)}
                  />
                </Col>
              </Row>
            )}
          </CustomResourcesList>
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
