import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import "../css/createtable.css";
import Sidebar from "./Sidebar";
import * as Yup from "yup";
import axios from "../api.js";
import { useHistory } from "react-router-dom";

export default function CreateMesa() {
  const validateTable = Yup.object().shape({
    nome: Yup.string()
      .min(3, "Min. de 3 caracteres")
      .required("Sua mesa precisa de um nome"),
    descricao: Yup.string()
      .max(70)
      .required("Sua mesa precisa de uma descrição"),
    password: Yup.string().max(12, "Max. de 12 caracteres"),
    18: Yup.boolean(),
    vagas: Yup.boolean(),
  });

  const history = useHistory();
  const [password, setPassword] = useState(false);

  function handleOnClick() {
    setPassword(!password);
  }

  function onCreate(values) {
    axios
      .get("/create_table", {
        params: {
          nome: values.nome,
          descricao: values.descricao,
          pass: values.pasword,
          adulto: values.dezoito,
          vagas: values.vagas,
          token: sessionStorage.token,
        },
      })
      .then(function (response) {
        history.push("/table/" + response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="create-table-wrapper">
      <Sidebar />
      <div>
        <h1>Criar Mesa</h1>
        <Formik
          validationSchema={validateTable}
          validateOnMount
          onSubmit={onCreate}
          initialValues={{
            nome: "",
            descricao: "",
            password: "",
            dezoito: false,
            vagas: false,
            token: "",
          }}
        >
          <Form className="create-table-form">
            <Field
              name="nome"
              placeholder="Nome da Mesa"
              className="create-table-input"
            ></Field>
            <div className="error">
              <ErrorMessage name="nome"></ErrorMessage>
            </div>

            <Field
              name="descricao"
              placeholder="Descrição da Mesa"
              className="create-table-input"
            ></Field>
            <div className="error">
              <ErrorMessage name="desc"></ErrorMessage>
            </div>

            {password && (
              <div>
                <Field
                  name="password"
                  placeholder="Senha da Mesa"
                  className="create-table-input"
                ></Field>
                <div className="error">
                  <ErrorMessage name="password"></ErrorMessage>
                </div>
              </div>
            )}
            <div className="create-table-checkbox-wrapper">
              <label>
                <input
                  onClick={handleOnClick}
                  name="passcheck"
                  type="checkbox"
                ></input>
                Senha
              </label>

              <label>
                <Field name="18" type="checkbox"></Field>
                +18
              </label>
              <label>
                <Field name="vagas" type="checkbox"></Field>
                Há vagas
              </label>
            </div>
            <button className="button-create-table" type="submit">
              Criar Mesa
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
