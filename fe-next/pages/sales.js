<<<<<<< HEAD
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'
import { useEffect, useState } from 'react'
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ComposedChart, Tooltip, Legend, Area, Bar } from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import {PieChart, Pie } from 'recharts';
=======
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  InputGroup,
  Table,
  Modal,
} from "react-bootstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Tooltip,
  Legend,
  Area,
  Bar,
} from "recharts";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
>>>>>>> e695cc988a338916a23c79ca6fe38c940529c7c2

export default function Sales() {
  const [weeklyData, setWeeklyData] = useState([
    {
      name: "Week 1",
      Profit: 5887,
      TotalSales: 4990,
      Revenue: 2500,
    },
    {
      name: "Week 2",
      Profit: 3200,
      TotalSales: 4398,
      Revenue: 2210,
    },
    {
      name: "Week 3",
      Profit: 5198,
      TotalSales: 6800,
      Revenue: 3290,
    },
    {
      name: "Week 4",
      Profit: 7280,
      TotalSales: 8708,
      Revenue: 5000,
    },
<<<<<<< HEAD
  
    { name: 'Group A', value: 430 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 250 },
    { name: 'Group D', value: 200 },
  
  ])
  
=======
  ]);
  const [monthlyData, setMonthlyData] = useState([
    {
      name: "Month 1",
      Profit: 5887,
      TotalSales: 4990,
      Revenue: 2500,
    },
    {
      name: "Month 2",
      Profit: 3200,
      TotalSales: 4398,
      Revenue: 2210,
    },
    {
      name: "Month 3",
      Profit: 5198,
      TotalSales: 6800,
      Revenue: 3290,
    },
    {
      name: "Month 4",
      Profit: 7280,
      TotalSales: 8708,
      Revenue: 5000,
    },
  ]);
  const [activeData, setActiveData] = useState("weekly");

>>>>>>> e695cc988a338916a23c79ca6fe38c940529c7c2
  return (
    <div>
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>
<<<<<<< HEAD
      
    <NavBar></NavBar>
=======

      <NavBar></NavBar>

      <h2 className="fs-2 text-center"> Sales Performance</h2>
>>>>>>> e695cc988a338916a23c79ca6fe38c940529c7c2

      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setActiveData(e.target.value)}
        value={activeData}
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </Form.Select>

      <div>
        <body>
          {" "}
          <h6 className="text-center">
            {" "}
            Here you will see a summary your transaction in a month{" "}
          </h6>{" "}
        </body>
      </div>

      <div className="text-center">
        <Badge bg="primary">Total Sales: 136, 435.49</Badge>{" "}
        <Badge bg="secondary">Revenue: 250, 435.49</Badge>{" "}
        <Badge bg="warning">Profit: 20, 435.49 </Badge>
      </div>

      <Container className="d-flex justify-content-center">
        <ComposedChart
          width={1000}
          height={400}
          data={activeData == "monthly" ? monthlyData : weeklyData}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="Profit"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="TotalSales" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="Revenue" stroke="#ff7300" />
        </ComposedChart>
      </Container>

<<<<<<< HEAD
<br></br>
<div className='text-center'>
<Badge bg="#8884d8">Profit: 20, 435.49 </Badge> 
</div>
<Container className="d-flex justify-content-center">
          <PieChart  width={400} height={300} data={data}>
        <Pie dataKey="value" data={data} fill="#8884d8" label />
          </PieChart>
        </Container>
        

<br></br>
  <h1 className="fs-2 text-center"> Sales Data</h1>
=======
      <br></br>
      <br></br>
      <br></br>
      <h1 className="fs-2 text-center"> Sales Data</h1>
>>>>>>> e695cc988a338916a23c79ca6fe38c940529c7c2

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
      <script>AOS.init();</script>
    </div>
  );
}
