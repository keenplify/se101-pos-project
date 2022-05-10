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

export default function Sales() {
  
  const [data,setData]=useState([
    {
      name: 'Jan',
      Profit: 5587,
      TotalSale: 4990,
      Revenue: 2500,
    },
    {
      name: 'Feb',
      Profit: 3200,
      TotalSale: 4398,
      Revenue: 2210,
    },
    {
      name: 'Mar',
      Profit: 5198,
      TotalSale: 6800,
      Revenue: 3290,
    },
    {
      name: 'Apr',
      Profit: 3280,
      TotalSale: 2708,
      Revenue: 3010,
    },
    { 
      name: 'May', 
    Profit: 5587,
    TotalSale: 4990,
    Revenue: 2500,
    value: 35
    },
    {
    name: 'Jun', 
    Profit: 4587,
    TotalSale: 3790,
    Revenue: 1300,
    value: 15 
    },
    { 
    name: 'Jul',
    Profit: 6127,
    TotalSale: 2490,
    Revenue: 3900,
    value: 20 
    },
    { 
    name: 'August',
    Profit: 6387,
    TotalSale: 5190,
    Revenue: 3620,
    value: 25 
    },
    { 
    name: 'Sep', 
    Profit: 2287,
    TotalSale: 1490,
    Revenue: 1734,
    },
    { 
    name: 'Oct', 
    Profit: 3287,
    TotalSale: 2190,
    Revenue: 2601,
    },
    { 
    name: 'Nov', 
    Profit: 6287,
    TotalSale: 4901,
    Revenue: 2607,
   },
   {
    name: 'Dec',
    Profit: 7137,
    TotalSale: 5290,
    Revenue: 3034, 
  },
  ])
    

  return (

    <div>
    
    <Head>
      <title>Vaperous M4ster - POS Website</title>
      <link rel="icon" href="/img/Logo.jpg" />
    </Head>

    <NavBar></NavBar>

  <h2 className="fs-2 text-center"> Sales Performance</h2>
  
  <Dropdown className='text-center'>
<Dropdown.Toggle variant="success" id="dropdown-basic">
  Month Sales
</Dropdown.Toggle>

<Dropdown.Menu>
  <Dropdown.Item href="sales">Month Sales</Dropdown.Item>
  <Dropdown.Item href="WeeklyCharts">Week Sales</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>


<div>
<body> <h6 className='text-center'> Here you will see a summary your transaction in a month </h6> </body>
</div>

<div  className='text-center'>
<Badge bg="primary">Total Sales: 136, 435.49</Badge> <Badge bg="secondary"> Revenue: 250, 435.49</Badge>{' '}
<Badge bg="warning" > Profit: 20, 435.49 </Badge> 
</div>


<Container><Badge bg="dark" > Battery Lion: 35% <br></br> Sale: 290 pcs<br></br> Total: 1750 </Badge> <Badge bg="dark" > Juice Tang: 25% <br></br> Sale: 250 pcs<br></br> Total: 1550 </Badge>
  <br></br><Badge bg="dark" > Pods Relx: 25% <br></br> Sale: 170 pcs<br></br> Total: 1350 </Badge> <Badge bg="dark" > Mod OXVA: 15% <br></br> Sale: 100 pcs<br></br> Total: 1150 </Badge>
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

<Container>
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>Months</th>
      <th>Total Sales</th>
      <th>Revenue</th>
      <th>Profit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>4490</td>
      <td>2500</td>
      <td>5587</td>
    </tr>
    <tr>
      <td>February</td>
      <td>4398</td>
      <td>2210</td>
      <td>3200</td>
    </tr>
    <tr>
      <td>March</td>
      <td>6800</td>
      <td>3290</td>
      <td>5198</td>
    </tr>
    <tr>
      <td>April</td>
      <td>2708</td>
      <td>3010</td>
      <td>3280</td>
    </tr>
    <tr>
      <td>May</td>
      <td>4990</td>
      <td>2500</td>
      <td>5587</td>
    </tr>
    <tr>
      <td>June</td>
      <td>3790</td>
      <td>4587</td>
      <td>1300</td>
    </tr>
    <tr>
      <td>July</td>
      <td>2490</td>
      <td>3900</td>
      <td>6127</td>
    </tr>
    <tr>
      <td>August</td>
      <td>5190</td>
      <td>3620</td>
      <td>6387</td>
    </tr>
    <tr>
      <td>September</td>
      <td>1490</td>
      <td>1734</td>
      <td>2287</td>
    </tr>
    <tr>
      <td>October</td>
      <td>2190</td>
      <td>3287</td>
      <td>2601</td>
    </tr>
    <tr>
      <td>November</td>
      <td>4901</td>
      <td>2607</td>
      <td>6287</td>
    </tr>
    <tr>
      <td>December</td>
      <td>5290</td>
      <td>3034</td>
      <td>7137</td>
    </tr>
  </tbody>
</Table>
</Container>
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
