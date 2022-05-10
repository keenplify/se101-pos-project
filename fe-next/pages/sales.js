import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'
import { useEffect, useState } from 'react'
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ComposedChart, Tooltip, Legend, Area, Bar, AreaChart } from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthenticateEmployee } from '../helpers/AuthenticateEmployee'
import Badge from 'react-bootstrap/Badge'
import { PieChart, Pie, ResponsiveContainer } from 'recharts';


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
    value: 15 },
    { name: 'Jul',
    Profit: 6127,
    TotalSale: 2490,
    Revenue: 3900,
    value: 20 },
    { name: 'August',
    Profit: 6387,
    TotalSale: 5190,
    Revenue: 3620,
    value: 25 },
    { name: 'Sep', 
    Profit: 2287,
    TotalSale: 1490,
    Revenue: 1734,
     },
    { name: 'Oct', 
    Profit: 3287,
    TotalSale: 2190,
    Revenue: 2601,
    },
    { name: 'Nov', 
    Profit: 6287,
    TotalSale: 4901,
    Revenue: 2607,
   },
    { name: 'Dec', 
    Profit: 7137,
    TotalSale: 5290,
    Revenue: 3034,
   },

  ]);

  const Data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

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


<Container className="d-flex justify-content-center">
        <PieChart  width={400} height={300} data={data}>
        <Pie dataKey="value" data={data} fill="#8884d8" label />
        
          </PieChart>

        </Container>

        <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            Data={Data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="amt" stroke="#ff7300" /> 
          </AreaChart>
        </ResponsiveContainer>
      </div>

<br></br>

  <h1 className="fs-2 text-center"> Sales Data</h1>

<Container>
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
      <td>Week 1</td>
      <td>4490</td>
      <td>5887</td>
      <td>2500</td>
      <td>01/03/2022</td>
      <td>Hala Man</td>
    </tr>
    <tr>
      <td>Week 2</td>
      <td>4398</td>
      <td>3200</td>
      <td>2210</td>
      <td>01/10/2022</td>
      <td>Sige Talon</td>
    </tr>
    <tr>
      <td>Week 3</td>
      <td>6800</td>
      <td>5198</td>
      <td>3290</td>
      <td>01/17/2022</td>
      <td>Haduken</td>
    </tr>
    <tr>
      <td>Week 4</td>
      <td>8708</td>
      <td>7280</td>
      <td>5000</td>
      <td>01/24/2022</td>
      <td>Ako Lang</td>
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
  