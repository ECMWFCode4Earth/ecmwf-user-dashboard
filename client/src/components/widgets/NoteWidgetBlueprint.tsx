import React, { useContext, useEffect, useRef } from "react";
import { DraftEditorCommand, Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import {NoteWidgetBuilder} from "../../models/widgetBuilders/NoteWidgetBuilder";
import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import _ from "lodash";


interface NoteWidgetConfiguration {
  rawContentState: any;
}


interface NoteWidgetBlueprintProps {
  builder: NoteWidgetBuilder;
}


const NoteWidgetBlueprint: React.FC<NoteWidgetBlueprintProps> = ({ builder }) => {


  const {
    removeWidgetFromCurrentTab,
    saveWidgetConfiguration,
    loadWidgetConfiguration
  } = useContext(TabManagerContext);
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  const saveTextWidgetConfiguration = useRef(_.debounce((textWidgetConfiguration) => saveWidgetConfiguration(builder.widgetId, textWidgetConfiguration), 1000));

//TODO: see if this dependency is the one causing the error
  useEffect(() => {
    const textWidgetConfiguration = loadWidgetConfiguration(builder.widgetId) as unknown as NoteWidgetConfiguration;
    if (textWidgetConfiguration) {
      setEditorState(EditorState.createWithContent(convertFromRaw(textWidgetConfiguration.rawContentState)));
    }
  }, []);


  useEffect(() => {
    const textWidgetConfiguration: NoteWidgetConfiguration = {
      rawContentState: convertToRaw(editorState.getCurrentContent()),
    };
    saveTextWidgetConfiguration.current(textWidgetConfiguration);
  }, [editorState]);


  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };


  return (
      <WidgetContainer>

        <WidgetTitleBar title={"Text Widget"} onClose={removeWidget}/>

        <WidgetBody px={1} py={1}>
          <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand}/>
        </WidgetBody>

      </WidgetContainer>
  );

};


export default NoteWidgetBlueprint;
