import { Flex } from "../styles/Flex.styles";
import { Container } from "../styles/LoginPage.styles";
import Lottie from "lottie-react";
import animation from "../lotties/forgot-password.json";
import { Form } from "../components/Form";
import { InputField } from "../components/InputField";
import { FormButton } from "../styles/Form.styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import forgotPassword from "../state/thunks/auth/forgotPassword";
import { BackdropContainer } from "../components/BackdropContainer";
import { AlertMessage } from "../components/AlertMessage";
import { isMobile } from "react-device-detect";
import {
  ForgotPasswordContainer,
  ForgotPasswordTitle,
} from "../styles/ForgotPassword";
import { useEffect, useState } from "react";
import { clearError } from "../state/reducers/AuthReducer";
import { Head } from "../components/Head";
import { Navigate } from "react-router-dom";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const {
    forgot_password_loading,
    forgot_password_error,
    forgot_password_message,
    auth,
  } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ email }) => {
    dispatch(forgotPassword(email));
    setDisabled(true)
  };

  useEffect(() => {
    dispatch(clearError("forgot_password_error"))
  }, [])

  if(auth) return <Navigate to={`/user/${auth?.user?._id}/chats`}/>

  return (
    <Container>
      <Head title="Forgot password"/>
      {forgot_password_loading && <BackdropContainer open={true} />}
      <div style={{ textAlign: "center" }}>
        <ForgotPasswordContainer>
          {!isMobile && (
            <Lottie
              animationData={animation}
              loop={false}
              autoplay={true}
              style={{ height: "500px" }}
            />
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ForgotPasswordTitle>Forgot Password</ForgotPasswordTitle>
            <InputField
              error={errors["email"]?.message}
              placeholder="Enter Email..."
              type="email"
              {...register("email")}
              name="email"
            />
            <FormButton
              disabled={disabled}
              type="submit"
              bg={theme.primaryAccentColor}
              hoverBg={theme.secondaryAccentColor}
              color={"#fff"}
              hoverColor={"#000"}
            >
              Get password reset url
            </FormButton>
          </Form>
        </ForgotPasswordContainer>
      </div>
      {forgot_password_error && (
        <AlertMessage
          type="error"
          handleClose={() => dispatch(clearError("forgot_password_error"))}
          message={forgot_password_error}
        />
      )}
      {forgot_password_message && (
        <AlertMessage
          type="success"
          handleClose={() => dispatch(clearError("forgot_password_message"))}
          message={forgot_password_message}
        />
      )}
    </Container>
  );
};
