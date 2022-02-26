import React, { Component } from 'react';
import { JSHINT } from 'jshint';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/comment/continuecomment';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';
// import 'codemirror/theme/monokai.css';

window.JSHINT = JSHINT;

const lintOptions = {
  esversion: 11,
  freeze: true,
  eqeqeq: true,
  latedef: true,
  leanswitch: true,
  shadow: 'outer',
  undef: true,
  unused: true,
  globals: [
    'global',
    'require',
    'module',
    'exports',
    'print',
    'seed',
    'dormant',
    'console',
    'process',
    'board',
    'storage',
    'LOW',
    'HIGH',
    'INPUT',
    'INPUT_PULLUP',
    'INPUT_PULLDOWN',
    'OUTPUT',
    'LOW_LEVEL',
    'HIGH_LEVEL',
    'FALLING',
    'RISING',
    'CHANGE',
    'pinMode',
    'digitalRead',
    'digitalWrite',
    'digitalToggle',
    'setWatch',
    'clearWatch',
    'analogRead',
    'analogWrite',
    'pulseRead',
    'pulseWrite',
    'tone',
    'noTone',
    'delay',
    'millis',
    'delayMicroseconds',
    'micros',
    'setTimeout',
    'setInterval',
    'clearTimeout',
    'clearInterval',
    'attachInterrupt',
    'detachInterrupt',
    'enableInterrupts',
    'disableInterrupts',
    'bota',
    'atob',
    'TextEncoder',
    'TextDecoder',
    'encodeURIComponent',
    'decodeURIComponent',
    'SystemError',
    '__netdev',
    '__ieee80211dev',
  ],
};

const PREP_KEY_SHOW_LINE_NUMBER = 'editor.show-line-numbers';
const PREP_KEY_FONT_SIZE = 'editor.font-size';
const PREP_KEY_INDENTATION = 'editor.indentation';
const PREP_KEY_LINT = 'editor.lint';

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.codeMirror = null;
    this.editorContainerRef = React.createRef();
  }

  componentDidMount() {
    // const { editorState } = this.props;

    // Set editorRef in editorState
    // editorState.editorRef = this;

    this.codeMirror = new CodeMirror(this.editorContainerRef.current, {
      // value: editorState.file.content,
      mode: 'javascript',
      theme: 'monokai',
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-lint-markers',
        'CodeMirror-foldgutter',
      ],
      indentWithTabs: false,
      lint: { options: lintOptions },
      indentUnit: 2,
      tabSize: 2,
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      foldGutter: true,
      styleActiveLine: true,
      continueComments: true,
      scrollbarStyle: 'overlay',
      extraKeys: {
        Tab: (cm) => {
          const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
          cm.replaceSelection(spaces);
        },
      },
    });
    /*
    this.codeMirror.on('cursorActivity', (cm) => {
      const cursor = cm.doc.getCursor();
      app.store.dispatch({
        type: actions.CODE_EDITOR_CURSOR,
        line: cursor.line + 1,
        col: cursor.ch + 1,
      });
    });
    */

    const editorDoc = this.codeMirror.getDoc();
    editorDoc.on('change', (doc, changeObj) => {
      // app.editorManager.setModified(editorState, !doc.isClean());
    });

    /*
    editorState.getContent = () => {
      return editorDoc.getValue();
    };
    */

    // this.setFontSize(app.preferences.get(PREP_KEY_FONT_SIZE));
  }

  /*
  setFontSize(size) {
    this.codeMirror.getWrapperElement().style['font-size'] = `${size}px`;
  }
  */

  setCursor(pos) {
    this.codeMirror.setCursor(pos);
  }

  lint() {
    this.codeMirror.performLint();
  }

  render() {
    return <div className="editor-container" ref={this.editorContainerRef} />;
  }
}
