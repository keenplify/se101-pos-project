import Head from 'next/head'
import { Container, Row, Col, Card, Table, InputGroup, Button, Form, FormControl } from "react-bootstrap"
import Deleteemp from '../components/deleteemp'
import Editemp from '../components/editEmp'
import Addemp from '../components/addemp'
import { useEffect, useState } from 'react'
import { NavBar } from '../components/navbar'
import {AiFillEdit} from "react-icons/ai"
import { Footer } from '../components/footer'
import { AuthenticateEmployee } from '../helpers/AuthenticateEmployee'
import axios from 'axios'
import { BACKEND } from '../helpers'
import { ChangeableImage } from '../components/ChangeableImage'
import { EmployeesQueries } from '../queries/employees'


export default function Empadsee({employee,allEmployees, token}) {
  return (
    <div>
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>
    <NavBar employee={employee}></NavBar>
    <br></br>
    <div> 
        <h1 className="fs-2 text-center"> Employee</h1>
        </div>
    <Container className="col-lg-12 my-3 rounded-3">  
    <Row>
    <Col className='p-2'>
      <div className="text-end">
    <Addemp token={token}></Addemp>
      </div>
    </Col>
  </Row>
    

  <Table striped bordered hover className="table table-image" >
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Image</th>
      <th scope="col">First Name</th>
      <th scope="col">LastName</th>
      <th scope="col">Role</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    { allEmployees && allEmployees.map ((_employee, key) => (
          <tr key={key}>
          <th scope="row">{_employee.id}</th>
          <td className="w-25">
            <ChangeableImage
              employee={employee}
              token={token}
              selectorId={_employee.id}
              query={EmployeesQueries.changeImage}
              image={_employee?.image_location}
            />
          </td>
          <td>{_employee.firstName}</td>
          <td>{_employee.lastName}</td>
          <td>{_employee.type}</td>
          <td className="py-2">
             <Editemp token={token} employee={_employee}></Editemp>
              <Deleteemp token={token} employee={_employee}></Deleteemp>
          </td>
        </tr>
    ))}
  </tbody>
</Table>

</Container>   
    <Footer></Footer>
  
    </div>
  )
}
export async function getServerSideProps(context) {
  const allEmployees=await axios.get(BACKEND + "/api/employees/all")
 const employee = await AuthenticateEmployee(context)

 if (employee.props.employee.type == "CASHIER"){ 
   return {
     redirect: {
       destination: "/employee",
       permanent: false,
     },
     props: {},
   };
 }

 if (!employee?.props?.employee) {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}

 return{
   props: {
     allEmployees:allEmployees.data.employees,
     ...(employee).props
   }

 }
}
