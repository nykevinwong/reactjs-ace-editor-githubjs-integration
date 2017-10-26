import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/haxe';
import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

const EditorPage = () => {
return (<AceEditor
            width="100%"
            mode={"haxe"}
            theme="monokai"
            onChange={ () => {} }
            value={ "test"}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            wrapEnabled
          />);
};


export default EditorPage;