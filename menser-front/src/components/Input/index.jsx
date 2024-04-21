import React from "react";

import {
  StyledInput,
  InputLabel,
  InputWrapper
} from "./style";

function Input({ label, id, name, placeholder, type, value, onChange, error}) {
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
          error={error}
        />
    </InputWrapper>
  )
};

export default Input;