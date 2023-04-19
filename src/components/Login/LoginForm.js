import React, { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase/firebaseAuth";
import classes from "./Login.module.css";
import gooBtn from "../../assets/gooBtn.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_name")) {
      navigate("/");
    }
  }, []);

  // google auth function
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    // await을 만나면 그 아래 코드 순차실행(원래는 비동기:다른데서 처리 후 돌아옴)
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("user_name", result.user.displayName);
    window.location.reload();
  };

  return (
    <div className={classes.login}>
      <h2>Google Login</h2>
      <button className={classes.button} onClick={googleLogin}>
        <img className={classes.gooBtn} src={gooBtn}></img>
      </button>
    </div>
  );
};

export default LoginForm;
