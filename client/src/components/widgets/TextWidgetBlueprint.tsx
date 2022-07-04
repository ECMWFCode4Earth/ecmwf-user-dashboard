import React, { useContext, useEffect, useRef } from "react";
import { DraftEditorCommand, Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import { TextWidgetBuilder } from "../../models/widgetBuilders/TextWidgetBuilder";
import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import _ from "lodash";


interface TextWidgetConfiguration {
  rawContentState: any;
}


interface TextWidgetBlueprintProps {
  builder: TextWidgetBuilder;
}


const TextWidgetBlueprint: React.FC<TextWidgetBlueprintProps> = ({ builder }) => {


  const {
    removeWidgetFromCurrentTab,
    saveWidgetConfiguration,
    loadWidgetConfiguration
  } = useContext(TabManagerContext);
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  const saveTextWidgetConfiguration = useRef(_.debounce((textWidgetConfiguration) => saveWidgetConfiguration(builder.widgetId, textWidgetConfiguration), 1000));

//TODO: see if this dependency is the one causing the error
  useEffect(() => {
    const textWidgetConfiguration = loadWidgetConfiguration(builder.widgetId) as TextWidgetConfiguration;
    if (textWidgetConfiguration) {
      setEditorState(EditorState.createWithContent(convertFromRaw(textWidgetConfiguration.rawContentState)));
    }
  }, [builder.widgetId, loadWidgetConfiguration]);


  useEffect(() => {
    const textWidgetConfiguration: TextWidgetConfiguration = {
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


export default TextWidgetBlueprint;
