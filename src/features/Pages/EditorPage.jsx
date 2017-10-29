import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/haxe';
import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

const EditorPage = ({match}) => {
return (
<div>
  <h1>{match.params.projname}</h1>
  <AceEditor
            width="100%"
            mode={"haxe"}
            theme="monokai"
            onChange={ () => {} }
            value={ "test"}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            wrapEnabled
          />
          </div>);
};


export default EditorPage;