import React, { useState } from "react";
import { useHistory } from "react-router";
import "../css/register.css";
import axios from "../api.js";
import { Formik, Form } from "formik";
import { TextField } from "../components/TextField";
import * as Yup from "yup";

function Register() {
  const validateRegister = Yup.object().shape({
    user: Yup.string().required(),
    email: Yup.string().email().required(),
    pass: Yup.string().required(),
  });

  // Lidando com erros: usuário existente (302) e email existente (303)
  const [error303, setError303] = useState(false);
  const [error302, setError302] = useState(false);

  const history = useHistory();

  function onSubmit(values) {
    axios
      .get("/signup", {
        params: {
          username: values.user,
          mail: values.email,
          pass: values.pass,
        },
      })
      .then(function (response) {
        history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error.response.status);
        if (error.response.status === 303) {
          setError303(true);
        } else if (error.response.status === 302) {
          setError302(true);
        }
      })
  }

  return (
    <div className="login-wrapper">
      <Formik
        validationSchema={validateRegister}
        onSubmit={onSubmit}
        initialValues={{
          user: "",
          email: "",
          pass: "",
        }}
      >
        {(isSubmitting) => (
          <Form className="form">
            <header>Criar Conta</header>
            {error302 ? (
              <span className="error">Usuário já cadastrado.</span>
            ) : (
              <></>
            )}
            <TextField
              name="user"
              type="text"
              placeholder="Usuário"
            ></TextField>
            {error303 ? (
              <span className="error">Email já cadastrado.</span>
            ) : (
              <></>
            )}
            <TextField
              name="email"
              type="email"
              placeholder="Email"
            ></TextField>
            <TextField
              name="pass"
              type="password"
              placeholder="Senha"
            ></TextField>
            <div className="button-wrapper">
              <button className="button" type="submit" disabled={!isSubmitting}>
                Cadastrar-se
              </button>
              <span className="login-redirect">
                Já possui uma conta ? <a href="/login">Entre aqui.</a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
      <img src="/register.svg" alt="" />
    </div>
  );
}

export default Register;
