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
import { PieChart, Pie, } from 'recharts';


export default function Sales({employee}) {
  
  const [data,setData]=useState([
    {
      name: 'Week 1',
      Profit: 387,
      TotalSale: 1290,
      Revenue: 450,
      value: 10
    },
    {
      name: 'Week 2',
      Profit: 250,
      TotalSale: 1198,
      Revenue: 210,
      value: 12
    },
    {
      name: 'Week 3' ,
      Profit: 421,
      TotalSale: 1322,
      Revenue: 520,
      value: 7
    },
    {
      name: 'Week 4',
      Profit: 780,
      TotalSale: 1508,
      Revenue: 705,
      value: 4
    },

  ]) 
  
  
  return (
    <div>
    
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>

      <NavBar employee={employee}></NavBar>

    <h2 className="fs-2 text-center"> Sales Performance</h2>
    

    <Dropdown className='text-center'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Weekly Sales
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="sales">Monthly Sales</Dropdown.Item>
    <Dropdown.Item href="WeeklyCharts">Weekly Sales</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>


<div>
 <body> <h6 className='text-center'> Here you will see a summary your transaction in a week </h6> </body>
</div>

<div  className='text-center'>
  <Badge bg="primary">Total Sales: 34, 435.49</Badge> <Badge bg="secondary"> Revenue: 62, 435.49</Badge>{' '}
  <Badge bg="warning" > Profit: 5, 435.49 </Badge> 
</div>


<Container><Badge bg="dark" > Battery Lion: 10% <br></br> Sale: 45 pcs<br></br> Total: 450 </Badge> <Badge bg="dark" > Juice Tang: 12% <br></br> Sale: 25 pcs<br></br> Total: 725 </Badge>
  <br></br><Badge bg="dark" > Pods Relx: 7% <br></br> Sale: 35 pcs<br></br> Total: 650 </Badge> <Badge bg="dark" > Mod OXVA: 4% <br></br> Sale: 25 pcs<br></br> Total: 650 </Badge>
        <Row>
        <PieChart  width={450} height={300} data={data}>
        <Pie dataKey="value" data={data} fill="#8884d8" label />
          </PieChart>

    <ComposedChart  width={630} height={400} data={data}>
    <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Area type="monotone" dataKey="Profit" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="TotalSale" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="Revenue" stroke="#ff7300" />
  </ComposedChart>
  
          </Row>
</Container>


  <h1 className="fs-2 text-center"> Sales Data</h1>


  <Table striped bordered hover>
  <thead>
    <tr>
      <th>Weeks</th>
      <th>Total Sales</th>
      <th>Revenue</th>
      <th>Profit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Week 1</td>
      <td>1290</td>
      <td>450</td>
      <td>387</td>
    </tr>
    <tr>
      <td>Week 2</td>
      <td>1198</td>
      <td>410</td>
      <td>300</td>
    </tr>
    <tr>
      <td>Week 3</td>
      <td>1322</td>
      <td>520</td>
      <td>421</td>
    </tr>
    <tr>
      <td>Week 4</td>
      <td>1508</td>
      <td>705</td>
      <td>780</td>
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
