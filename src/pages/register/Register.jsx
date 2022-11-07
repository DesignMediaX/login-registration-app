import React, { useContext, useState } from "react";
import FormInput from "../../components/formInput/FormInput";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { FacebookRounded } from "@mui/icons-material";
import { auth, provider } from "../../firebase";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "text",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character",
      pattern: `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "text",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      pattern: inputValues.password,
      required: true,
    },
  ];

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        inputValues.email,
        inputValues.password
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: inputValues.username,
        });
        navigate("/login");
      });
    } catch (error) {}
  };

  const signInWithGoogle = () => {
    dispatch({ type: "LOGIN_START" });

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };
  // console.log(inputValues);
  return (
    <div className="register">
      <form>
        <h2>Register</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputValues[input.name]}
            onChange={handleChange}
          />
        ))}
        <button type="submit" onClick={handleRegister}>
          Register
        </button>

        <div className="formLink">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="formSignup"
            style={{ textDecoration: "none" }}
          >
            {" "}
            SignIn
          </Link>
        </div>

        <div className="line"></div>
        <div className="media-options">
          <Link to="#" className="facebook" style={{ textDecoration: "none" }}>
            <FacebookRounded className="facebookIcon" />
            <span>Login with Facebook</span>
          </Link>
        </div>
        <div className="media-options">
          <Link
            to="#"
            className="facebook google"
            style={{ textDecoration: "none" }}
            onClick={signInWithGoogle}
          >
            <img src="/assets/google.png" alt="" className="googleImg" />
            <span>Login with Google</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
