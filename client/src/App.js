import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Chats } from "./pages/Chats";
import { EmailVerification } from "./pages/EmailVerification";
import { EmailVerified } from "./pages/EmailVerified";
import { ForgotPassword } from "./pages/ForgotPassword";
import { LoginPage } from "./pages/LoginPage";
import { PasswordReset } from "./pages/PasswordReset";
import { SignupPage } from "./pages/SignupPage";
import { SocketContext } from "./socket";

function App() {
  const { socket } = useContext(SocketContext)

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if(socket && auth) {
      socket.emit("set_up", auth?.user)
    }
  }, [socket, auth])

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user/:id/verifyemail" element={<EmailVerification />} />
          <Route
            path="/user/:id/chats"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:id/chats/:chatId"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:id/email_verification_token/:token"
            element={<EmailVerified />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset/:token" element={<PasswordReset />} />
        </Routes>
      </Router>
  );
}

export default App;
