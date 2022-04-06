import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { BACKEND } from '../helpers';
import Router from 'next/router';


export default function Login() {
  
 return <div>
  <h1>Sign Up</h1>
  <Formik
    initialValues={{
      id: '',
      password: '',
      
    }}
    onSubmit={async (values, action) => {
      axios.post(BACKEND + "/api/employees/login", {
        id: values.id,
        password: values.password
      })
      .then(function (response) {
        localStorage.setItem("token",response.data.token)
        Router.push("/")
      })
      .catch(function (error) {
        console.log(error);
        action.setStatus("unavailab;e to login")

      });
    }}
  >
    {
      formik => <Form>
        {formik.status && <div>{formik.status}</div>}
      <label htmlFor="id">ID</label>
      <Field id="id" name="id" placeholder="Jane" />

      <label htmlFor="password">Password</label>
      <Field type="password" id="password" name="password" placeholder="Doe" />

      
      <button type="submit">Submit</button>
    </Form>

    }
  </Formik>
</div>


}
