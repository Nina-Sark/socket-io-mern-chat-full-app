import { forwardRef } from "react";
import { HelperText, Input, InputContainer } from "../styles/Form.styles";

export const InputField = forwardRef(
  ({ type = "text", name = "", placeholder, error = null, ...props }, ref) => {
    return (
      <InputContainer>
        <Input
          ref={ref}
          placeholder={placeholder}
          type={type}
          name={name}
          {...props}
        />
        {error && <HelperText>{error}</HelperText>}
      </InputContainer>
    );
  }
);
