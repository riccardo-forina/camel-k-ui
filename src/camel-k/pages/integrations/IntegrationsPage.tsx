import {
  Col,
  Filter,
  FormControl,
  Row,
  Sort,
  Toolbar,
} from 'patternfly-react';
import * as React from 'react';
import { ICustomResource } from '../../../kubernetes';
import { AsyncCustomResourcesList } from '../../../kubernetes/pages/custom-resource/components';
import { WithCustomResources } from '../../../kubernetes/pages/custom-resource/containers';
import { Editor } from '../../../ui';

export function specLanguageMapper(language: string) {
  const langsMap = {
    'js': 'javascript',
  };
  return langsMap[language] || null;
}

export function makeSaveFunction(
  save: any,
  item: ICustomResource) {
  return (content: string) => {
    const newItem = { ...item};
    newItem.spec.source.content = content;
    save(newItem.metadata.selfLink, newItem);
  }
}

export interface IIntegrationPageState {
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

export class IntegrationsPage extends React.Component<{}, IIntegrationPageState> {
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
      <div className={'container-fluid'}>
        <WithCustomResources
          group={'camel.apache.org'}
          version={'v1alpha1'}
          namesPlural={'integrations'}
        >
          {asyncResource => {
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
                    <Toolbar.Find
                      placeholder="Find By Keyword..."
                      currentIndex={1}
                      totalCount={3}
                      onChange={null}
                      onEnter={null}
                      onFindNext={null}
                      onFindPrevious={null}
                    />
                  </Toolbar.RightContent>
                  <Toolbar.Results>
                    {asyncResource.loading
                      ? <div className="spinner" />
                      : <h5>{asyncResource.data.items.length} Results</h5>
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

                <AsyncCustomResourcesList {...asyncResource}>
                  {(item, index) => (
                    <Row>
                      <Col sm={12}>
                        <Editor
                          language={specLanguageMapper(item.spec.source.language)}
                          spec={item.spec.source.content}
                          onSave={makeSaveFunction(asyncResource.save, item)}
                        />
                      </Col>
                    </Row>
                  )}
                </AsyncCustomResourcesList>
              </React.Fragment>
            );
          }}
        </WithCustomResources>
      </div>
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