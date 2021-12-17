import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CSSModules from "react-css-modules";
// import { auth } from "../../firebase";
import style from "./style.module.scss";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (event) => {
    event.preventDefault();
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     //redirect to home page
    //     history.push("/");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };
  const register = (event) => {
    event.preventDefault();
    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     //create a user, login and redirect to homepage
    //     history.push("/");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };
  return (
    <div styleName="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
          styleName="login__logo"
        />
      </Link>
      <div styleName="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>Email:</h5>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <h5>Password:</h5>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
          <button type="submit" onClick={signIn} styleName="login__signInBtn">
            sign in
          </button>
          <p>
            by signing in you agree to amazon condition of use and sale.Please
            see our privacy notice, our cookies notice and our interest based ad
            notice.
          </p>
          <button onClick={register} styleName="login__registerBtn">
            create your amazon account
          </button>
        </form>
      </div>
    </div>
  );
};
export default CSSModules(Login, style);
