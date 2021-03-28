import axios from "../api.js";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "../css/login.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from "../components/TextField.js";

function Login() {
  const validateLogin = Yup.object().shape({
    email: Yup.string().email().required(),
    pass: Yup.string().required(),
  });

  const history = useHistory();
  const [error, setError] = useState(false);

  function onSubmit(values) {
    axios
      .get("/login", {
        params: {
          mail: values.email,
          pass: values.pass,
        },
      })
      .then(function (response) {
        sessionStorage.setItem('token', response.data.token)
        history.push("/dashboard");
      })
      .catch(function (error) {
        setError(true);
      });
  }

  return (
    <div className="login-wrapper">
      <Formik
        validationSchema={validateLogin}
        validateOnMount
        onSubmit={onSubmit}
        initialValues={{
          email: "",
          pass: "",
        }}
      >
        {() => (
          <Form className="form">
            <header className="header">Entrar</header>
            {error ? (
              <span className="error">Email ou senha incorretos.</span>
            ) : (
              <></>
            )}
            <TextField name="email" type="email" placeholder="Email" />
            <TextField name="pass" type="password" placeholder="Senha" />
            <div className="button-wrapper">
              <button className="button" type="submit">
                Entrar
              </button>
              <span className="login-redirect">
                Não possui uma conta ? <a href="/">Cadastre-se aqui.</a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
      <img src="/login.svg" alt="" />
    </div>
  );
}
//lulin viadin
export default Login;
