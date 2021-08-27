import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { DraftEditorCommand, Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import { TextWidgetBuilder } from "../../models/widgetBuilders/TextWidgetBuilder";

import { WidgetBuilderContext } from "../../utils/contexts/WidgetBuilderContext";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface TextWidgetBlueprintProps {
  builder: TextWidgetBuilder;
}


const TextWidgetBlueprint: React.FC<TextWidgetBlueprintProps> = ({builder}) => {

  const classes = useStyles();
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
  const {removeWidgetBuilder} = useContext(WidgetBuilderContext);


  const removeWidget = () => removeWidgetBuilder(builder);

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
