import { Form, Formik, Field, ErrorMessage } from "formik";
import React from "react";
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
    18: Yup.boolean(),
    vagas: Yup.boolean(),
  });

  const history = useHistory();

  function onCreate(values) {
    axios
      .get("/create_table", {
        params: {
          nome: values.nome,
          descricao: values.descricao,
          adulto: values.dezoito,
          vagas: values.vagas,
          token: sessionStorage.token,
        },
      })
      .then(function (response) {
        history.push("/table/" + response.data.id);
      })
      .catch(function (error) {});
  }

  return (
    <div className="form-wrapper">
      <Sidebar></Sidebar>
      <Formik
        validationSchema={validateTable}
        validateOnMount
        onSubmit={onCreate}
        initialValues={{
          nome: "",
          descricao: "",
          dezoito: false,
          vagas: false,
          token: "",
        }}
      >
        <Form className="form-create">
          <Field
            name="nome"
            placeholder="Nome da Mesa"
            className="name"
          ></Field>
          <ErrorMessage name="nome"></ErrorMessage>

          <Field
            name="descricao"
            placeholder="Descrição da Mesa"
            className="description"
          ></Field>
          <ErrorMessage name="desc"></ErrorMessage>
          <label>
            <Field name="18" type="checkbox"></Field>
            +18
          </label>
          <label>
            <Field name="vagas" type="checkbox"></Field>
            Há vagas
          </label>
          <div className="button-wrapper">
            <button className="button" type="submit">
              Criar Mesa
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
