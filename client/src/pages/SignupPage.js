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
import { useEffect } from "react";
import signup from "../state/thunks/auth/signup";
import { clearError } from "../state/reducers/AuthReducer";
import { Head } from "../components/Head";

export const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, signup_loading, signup_error } = useSelector(
    (state) => state.auth
  );
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Name should contain at lest 2 characters")
      .required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    newPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Password should contain at least 8 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm the password")
      .oneOf([yup.ref("newPassword"), null])
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
    const userData = {
        name : data?.name,
        email : data?.email,
        password : data?.newPassword,
        picture : "https://www.hoodbuilder.com/wp-content/uploads/2020/09/login-icon-images-24.png"
    }

    dispatch(signup(userData))
  };

  useEffect(() => {
    if (auth?.user) {
      if (auth?.user?.emailVerified) {
        navigate(`/user/${auth?.user?._id}/chats`);
      } else {
        navigate(`/user/${auth?.user?._id}/verifyemail`);
      }
    }
  }, [auth]);


  useEffect(() => {
    dispatch(clearError("signup_error"))
  }, [])

  return (
    <Container>
      <Head title="Sign up"/>
      <BackdropContainer open={signup_loading} />
      <Flex alignItems="center" justifyContent="center" gap="10em">
        <Logo />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            error={errors["name"]?.message}
            placeholder="Enter name..."
            type="name"
            {...register("name")}
            name="name"
          />
          <InputField
            error={errors["email"]?.message}
            placeholder="Enter email..."
            type="email"
            {...register("email")}
            name="email"
          />
          <InputField
            error={errors["newPassword"]?.message}
            placeholder="Enter new password..."
            type="password"
            {...register("newPassword")}
            name="newPassword"
          />
          <InputField
            error={errors["confirmPassword"]?.type === "oneOf" ? "Passwords don't match" : errors["confirmPassword"]?.message}
            placeholder="Confirm password..."
            type="password"
            {...register("confirmPassword")}
            name="confirmPassword"
          />
          <FormButton
            type="submit"
            bg={theme.primaryAccentColor}
            hoverBg={theme.secondaryAccentColor}
            color={"#fff"}
            hoverColor={"#000"}
          >
            Sign up
          </FormButton>
          <span style={{ marginTop: "1em" }}>Already have an account?</span>
          <Divider />
          <FormButton
            onClick={() => navigate("/")}
            bg={theme.secondaryAccentColor}
            hoverBg={theme.primaryAccentColor}
            color={"#000"}
            hoverColor={"#fff"}
          >
            Log in to your account
          </FormButton>
        </Form>
      </Flex>
      {signup_error && <AlertMessage handleClose={() => dispatch(clearError("signup_error"))} type="error" message={signup_error} />}
    </Container>
  );
};
