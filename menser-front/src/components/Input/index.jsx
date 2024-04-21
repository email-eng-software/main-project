import React from "react";

import {
  StyledInput,
  InputLabel,
  InputWrapper
} from "./style";

function Input({ label, id, name, placeholder, type, value, onChange}) {
  return (
    <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <StyledInput
          id={id}
          name={name}
          placeholder={placeholder}
          required
          onChange={onChange}
          type={type}
          value={value}
        />
    </InputWrapper>
  )
};

export default Input;