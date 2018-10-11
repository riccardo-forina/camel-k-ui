import { editor } from 'monaco-editor';
import { Button, Col, Row } from 'patternfly-react';
import * as React from 'react';
import MonacoEditor  from 'react-monaco-editor';
import IEditorOptions = editor.IEditorOptions;

export interface ISpecEditorProps {
  language: string;
  spec: string;
  onSave(spec: string): void;
}

export interface ISpecEditorState {
  editedSpec: string;
  editorOptions: IEditorOptions;
  hasChanges: boolean
}

export class Editor extends React.Component<ISpecEditorProps, ISpecEditorState> {
  public constructor(props: ISpecEditorProps) {
    super(props);
    this.state = {
      editedSpec: props.spec,
      editorOptions: {
        minimap: {
          enabled: false
        }
      },
      hasChanges: false
    };
  }

  public onChange = (editedSpec: string): void => {
    this.setState({
      editedSpec,
      hasChanges: true
    });
  };

  public onReset = (): void => {
    this.setState({
      editedSpec: this.props.spec,
      hasChanges: false
    });
  };

  public onSave = (): void => {
    this.props.onSave(this.state.editedSpec);
    this.setState({
      hasChanges: false
    });
  };

  public render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <MonacoEditor
              width="100%"
              height="300"
              language={this.props.language}
              theme="vs"
              value={this.state.editedSpec}
              options={this.state.editorOptions}
              onChange={this.onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Button
              disabled={!this.state.hasChanges}
              onClick={this.state.hasChanges ? this.onReset : null}>
              Reset
            </Button>{' '}
            <Button
              bsStyle={'primary'}
              disabled={!this.state.hasChanges}
              onClick={this.state.hasChanges ? this.onSave : null}>
              Save
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}