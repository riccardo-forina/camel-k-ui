import { editor } from 'monaco-editor';
import * as React from 'react';
import MonacoEditor  from 'react-monaco-editor';
import IEditorOptions = editor.IEditorOptions;

export interface ISpecEditorProps {
  spec: string;
  onSave(spec: string): void;
}

export interface ISpecEditorState {
  editedSpec: string;
  editorOptions: IEditorOptions
}

export class SpecEditor extends React.Component<ISpecEditorProps, ISpecEditorState> {
  public constructor(props: ISpecEditorProps) {
    super(props);
    this.state = {
      editedSpec: props.spec,
      editorOptions: {
        minimap: {
          enabled: false
        }
      }
    };
  }

  public onChange = (editedSpec: string): void => {
    this.setState({
      editedSpec
    });
  };

  public render() {
    return (
      <MonacoEditor
        width="100%"
        height="400"
        language="json"
        theme="vs"
        value={this.state.editedSpec}
        options={this.state.editorOptions}
        onChange={this.onChange}
      />
    );
  }
}