import React, { useState } from "react";
import { Container } from "../styles/LoginPage.styles";
import Lottie from "lottie-react";
import emailVerificationAnimation from "../lotties/email-verification.json";
import { EmailVerifyContainer } from "../styles/EmailVerify.styles";
import { useDispatch, useSelector } from "react-redux";
import theme from "../styles/theme";
import { FormButton } from "../styles/Form.styles";
import { Link } from "react-router-dom";
import getEmailVerificationToken from "../state/thunks/auth/getEmailVerificationToken";
import { BackdropContainer } from "../components/BackdropContainer";
import { AlertMessage } from "../components/AlertMessage";
import { Head } from "../components/Head";
import { clearError } from "../state/reducers/AuthReducer";

export const EmailVerification = () => {
  const dispatch = useDispatch()

  const { auth, email_verification_loading, email_verification_message } = useSelector((state) => state.auth);
  const [disabled, setDisabled] = useState(false)

  const sendEmailVerification = () => {
     dispatch(getEmailVerificationToken(auth?.token))
     setDisabled(true)
  }

  return (
    <Container style={{ padding : "1em" }}>
      <Head title="Verify email"/>
      <BackdropContainer open={email_verification_loading}/>
      <EmailVerifyContainer>
        <Lottie
          id="email-lottie"
          animationData={emailVerificationAnimation}
          loop={true}
          autoplay={true}
          style={{ height: 400, marginTop : "-80px" }}
        />
        <h1>Verify Your Email Address</h1>
        <p>
          You've entered <b style={{ color : theme.primaryAccentColor }}>{auth?.user?.email}</b> as the email address for you account.
        </p>
        <p>Please verify this email by clicking the button below.</p>
        <FormButton
        disabled={disabled}
        onClick={() => sendEmailVerification()}
        style={{ marginBottom : "0.6em" }}
        bg={theme.secondaryAccentColor}
        hoverBg={theme.primaryAccentColor}
        color={"#000"}
        hoverColor={"#fff"}>
            Verify your email
        </FormButton>
        <br/>
        <Link style={{ color : theme.primaryAccentColor }} to={`/user/${auth?.user?._id}/chats`}>Do it later</Link>
        {email_verification_message && <AlertMessage message={email_verification_message} handleClose={() => dispatch(clearError("email_verification_message"))} type="success"/>}
      </EmailVerifyContainer>
    </Container>
  );
};
