import { Link } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Logo } from "../components/Logo";
import { Flex } from "../styles/Flex.styles";
import { Divider, FormButton } from "../styles/Form.styles";
import { Container } from "../styles/LoginPage.styles";
import theme from "../styles/theme";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../components/Form";
import { AlertMessage } from "../components/AlertMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import login from "../state/thunks/auth/login";
import { BackdropContainer } from "../components/BackdropContainer";
import { useContext, useEffect } from "react";
import { clearError } from "../state/reducers/AuthReducer";
import { Head } from "../components/Head";
import { SocketContext } from "../socket";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext)

  const { auth, login_loading, login_error } = useSelector((state) => state.auth);
   console.log(auth)
  const schema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should contain at least 8 characters"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if(auth?.user && socket) {
      socket.emit("user_connected", auth?.user)
      if(auth?.user?.emailVerified) {
        navigate(`/user/${auth?.user?._id}/chats`)
      } else {
        navigate(`/user/${auth?.user?._id}/verifyemail`)
      }
    }
  }, [auth])

  useEffect(() => {
    dispatch(clearError("login_error"))
  }, [])

  return (
    <Container>
      <Head title="Login"/>
      <BackdropContainer open={login_loading}/>
      <Flex alignItems="center" justifyContent="center" gap="10em">
        <Logo />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            error={errors["email"]?.message}
            placeholder="Enter Email..."
            type="email"
            {...register("email")}
            name="email"
          />
          <InputField
            error={errors["password"]?.message}
            placeholder="Enter Password..."
            type="password"
            {...register("password")}
            name="password"
          />
          <FormButton
            type="submit"
            bg={theme.primaryAccentColor}
            hoverBg={theme.secondaryAccentColor}
            color={"#fff"}
            hoverColor={"#000"}
          >
            Log in
          </FormButton>
          <Link
            to="/forgotpassword"
            style={{ color: "#fff", marginTop: "1em" }}
          >
            Forgot the password?
          </Link>
          <Divider />
          <FormButton
            onClick={() => navigate("/signup")}
            bg={theme.secondaryAccentColor}
            hoverBg={theme.primaryAccentColor}
            color={"#000"}
            hoverColor={"#fff"}
          >
            Create new account
          </FormButton>
        </Form>
      </Flex>
      {login_error && (
        <AlertMessage
        handleClose={() => dispatch(clearError("login_error"))}
        type="error"
        message={login_error}
      />
      )}
    </Container>
  );
};
