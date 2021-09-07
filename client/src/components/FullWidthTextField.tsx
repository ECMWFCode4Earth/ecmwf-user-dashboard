import React from "react";
import { TextField } from "@material-ui/core";


interface FullWidthTextFieldProps {
  readOnly: boolean;
  value?: string;
  label: string;
  name: string;
}


const FullWidthTextField: React.FC<FullWidthTextFieldProps> = ({ readOnly, value, label, name }) => {
  return (
    <TextField
      fullWidth
      value={value || ""}
      name={name}
      label={label}
      margin={"dense"}
      InputProps={{
        readOnly: readOnly,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};


export default FullWidthTextField;
