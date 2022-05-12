import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../styles/LoginPage.styles";
import Lottie from "lottie-react";
import animation from "../lotties/verified-email.json";
import emailError from "../lotties/email-error.json";
import theme from "../styles/theme";
import { Title } from "../styles/EmailVerify.styles";
import { useDispatch, useSelector } from "react-redux";
import { BackdropContainer } from "../components/BackdropContainer";
import verifyEmail from "../state/thunks/auth/verifyEmail";
import { FormButton } from "../styles/Form.styles";
import { clearError } from "../state/reducers/AuthReducer";
import { Head } from "../components/Head";

export const EmailVerified = () => {
  const dispatch = useDispatch();

  const {
    auth,
    email_verification_success,
    verify_email_loading,
    verify_email_error,
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail({ emailToken: token, userToken: auth?.token }));
  }, []);

  useEffect(() => {
    if (email_verification_success) {
      setTimeout(() => {
        navigate(`/user/${auth?.user?._id}/chats`);
      }, 9000);
    }
  }, [email_verification_success]);

    
  useEffect(() => {
    dispatch(clearError("verify_email_error"))
  }, [])

  return (
    <Container>
      <Head title={verify_email_loading ? "Loading..." : email_verification_success ? "Email verified" : "Error"}/>
      {verify_email_loading ? (
        <BackdropContainer open={true} />
      ) : email_verification_success ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <Title>Email Successfuly Verified</Title>
          </div>
          <Lottie
            animationData={animation}
            loop={false}
            autoplay={true}
            height={400}
          />
        </div>
      ) : (
        <div style={{ textAlign : "center", marginTop : "-50px" }}>
          <Lottie
            animationData={emailError}
            loop={false}
            autoplay={true}
            style={{ height: "500px" }}
          />
          <div style={{ textAlign: "center" }}>
            <Title style={{ color: theme.primaryAccentColor }}>
              Something went wrong!
            </Title>
          </div>
          <FormButton
            onClick={() => navigate(`/user/${auth?.user?._id}/verifyemail`)}
            bg={theme.primaryAccentColor}
            hoverBg={theme.secondaryAccentColor}
            color={"#fff"}
            hoverColor={"#000"}
          >
            Try again
          </FormButton>
        </div>
      )}
    </Container>
  );
};
