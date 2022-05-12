import { Flex } from "../styles/Flex.styles";
import { Container } from "../styles/LoginPage.styles";
import Lottie from "lottie-react";
import animation from "../lotties/reset-password.json";
import { Form } from "../components/Form";
import { InputField } from "../components/InputField";
import { FormButton } from "../styles/Form.styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { BackdropContainer } from "../components/BackdropContainer";
import { AlertMessage } from "../components/AlertMessage";
import { isMobile } from "react-device-detect";
import {
  ForgotPasswordContainer,
  ForgotPasswordTitle,
} from "../styles/ForgotPassword";
import { useEffect, useState } from "react";
import resetPassword from "../state/thunks/auth/resetPassword";
import { Navigate, useParams } from "react-router-dom";
import { clearError } from "../state/reducers/AuthReducer";
import { Head } from "../components/Head";

export const PasswordReset = () => {
    const { token } = useParams()
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const {
    reset_password_loading,
    reset_password_error,
    reset_password_message,
    auth
  } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password")
      .oneOf([yup.ref("password"), null]),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ password, confirmPassword }) => {
    dispatch(resetPassword({ token, newPassword : password }));
    setDisabled(true);
  };

  
  useEffect(() => {
    dispatch(clearError("reset_password_error"))
  }, [])

  if(auth) return <Navigate to={`/user/${auth?.user?._id}/chats`}/>

  return (
    <Container>
      <Head title="Reset password"/>
      {reset_password_loading && <BackdropContainer open={true} />}
      <div style={{ textAlign: "center" }}>
        <ForgotPasswordContainer>
          {!isMobile && (
            <Lottie
              animationData={animation}
              loop={true}
              autoplay={true}
              style={{ height: "500px" }}
            />
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ForgotPasswordTitle>Reset Password</ForgotPasswordTitle>
            <InputField
              error={errors["password"]?.message}
              placeholder="Enter new password..."
              type="password"
              {...register("password")}
              name="password"
            />
            <InputField
              error={
                errors["confirmPassword"]?.type === "oneOf"
                  ? "Passwords don't match"
                  : errors["confirmPassword"]?.message
              }
              placeholder="Confirm password..."
              type="password"
              {...register("confirmPassword")}
              name="confirmPassword"
            />
            <FormButton
              disabled={disabled}
              type="submit"
              bg={theme.primaryAccentColor}
              hoverBg={theme.secondaryAccentColor}
              color={"#fff"}
              hoverColor={"#000"}
            >
              Change password
            </FormButton>
          </Form>
        </ForgotPasswordContainer>
      </div>
      {reset_password_error && (
        <AlertMessage
          type="error"
          handleClose={() => dispatch(clearError("reset_password_error"))}
          message={reset_password_error}
        />
      )}
      {reset_password_message && (
        <AlertMessage
          type="success"
          handleClose={() => dispatch(clearError("reset_password_message"))}
          message={reset_password_message}
        />
      )}
    </Container>
  );
};
