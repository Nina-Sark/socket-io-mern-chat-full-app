import { FormContainer } from "../styles/Form.styles"

export const Form = ({ children, ...props }) => {
  return (
    <FormContainer {...props}>
       {children}
    </FormContainer>
  )
}
