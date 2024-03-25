
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();
  const clickHandler = async () => {
    console.log("Button clicked");
    await loginWithPopup();
  }
  return <button className="login-button" onClick={clickHandler}>Log In</button>;
};

export default LoginButton;