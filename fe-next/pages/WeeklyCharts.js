import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'
import { useEffect, useState } from 'react'
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ComposedChart, Tooltip, Legend, Area, Bar } from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthenticateEmployee } from '../helpers/AuthenticateEmployee'
import Badge from 'react-bootstrap/Badge'


export default function Sales({employee}) {
  
  const [data,setData]=useState([
    {
      name: 'Monday',
      Profit: 887,
      TotalSale: 1990,
      Revenue: 2500,
    },
    {
      name: 'Tuesday',
      Profit: 1200,
      TotalSale: 1398,
      Revenue: 1210,
    },
    {
      name: 'Wednesday',
      Profit: 998,
      TotalSale: 1800,
      Revenue: 1290,
    },
    {
      name: 'Thursday',
      Profit: 780,
      TotalSale: 1708,
      Revenue: 1000,
    },
    {
      name: 'Friday',
      Profit: 880,
      TotalSale: 1908,
      Revenue: 1400,
    },
    {
       name: 'Saturday',
       Profit: 640,
       TotalSale : 1908,
       Revenue: 980,
    },
    {
       name: 'Sunday',
       Profit: 1240,
       TotalSale : 980,
       Revenue: 1330, 
    }

  ])
  
  return (
    <div>
    
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>

      <NavBar employee={employee}></NavBar>

    <h2 className="fs-2 text-center"> Sales Performance</h2>
    

    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Week Sales
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="sales">Month Sales</Dropdown.Item>
    <Dropdown.Item href="WeeklyCharts">Week Sales</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>


<div>
 <body> <h6> Here you will see a summary your transaction in a month </h6> </body>
</div>

<div>
  <Badge bg="primary">Total Sales: 34, 435.49</Badge> <Badge bg="secondary">Revenue: 62, 435.49</Badge>{' '}
  <Badge bg="warning">Profit: 5, 435.49 </Badge> 
</div>

      <Container className="d-flex justify-content-center">
    <ComposedChart  width={1000} height={400} data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <CartesianGrid stroke="#f5f5f5" />
  <Area type="monotone" dataKey="Profit" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="TotalSale" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="Revenue" stroke="#ff7300" />
  
</ComposedChart>
</Container>

<br></br>
<br></br>
<br></br>

  <h1 className="fs-2 text-center"> Sales Data</h1>


  <Table striped bordered hover>
  <thead>
    <tr>
      <th>Weeks</th>
      <th>Total Sales</th>
      <th>Profit</th>
      <th>Revenue</th>
      <th>Date</th>
      <th>Employee</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>1990</td>
      <td>887</td>
      <td>2500</td>
      <td>01/03/2022</td>
      <td>Hala Man</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>1398</td>
      <td>1200</td>
      <td>1210</td>
      <td>01/04/2022</td>
      <td>Sige Talon</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>1800</td>
      <td>998</td>
      <td>1290</td>
      <td>01/05/2022</td>
      <td>Haduken</td>
    </tr>
    <tr>
      <td>Thursday</td>
      <td>1708</td>
      <td>780</td>
      <td>1000</td>
      <td>01/06/2022</td>
      <td>Ako Lang</td>
    </tr>
    <tr>
      <td>Friday</td>
      <td>1908</td>
      <td>880</td>
      <td>1400</td>
      <td>01/07/2022</td>
      <td>Ewan Ko</td>
    </tr>
    <tr>
      <td>Saturday</td>
      <td>1908</td>
      <td>640</td>
      <td>980</td>
      <td>01/08/2022</td>
      <td>Bahag Hari</td>
    </tr>
    <tr>
      <td>Sunday</td>
      <td>980</td>
      <td>1240</td>
      <td>1330</td>
      <td>01/09/2022</td>
      <td>Hay Buhay</td>
    </tr>

  </tbody>
</Table>

<br></br>
<br></br>
<br></br>

  <Footer></Footer>

   
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>

    </div>
  )
}
export async function getServerSideProps(context) {
  return AuthenticateEmployee(context);
}
