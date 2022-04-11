import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'
import { useEffect, useState } from 'react'
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, ComposedChart, Tooltip, Legend, Area, Bar } from 'recharts';


export default function Sales() {
  
  const [data,setData]=useState([
    {
      name: 'Week 1',
      Profit: 5887,
      TotalSale: 4990,
      Revenue: 2500,
    },
    {
      name: 'Week 2',
      Profit: 3200,
      TotalSale: 4398,
      Revenue: 2210,
    },
    {
      name: 'Week 3',
      Profit: 5198,
      TotalSale: 6800,
      Revenue: 3290,
    },
    {
      name: 'Week 4',
      Profit: 7280,
      TotalSale: 8708,
      Revenue: 5000,
    }

  ])
  
  return (
    <div>
    
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>

    <NavBar></NavBar>

    <h2 className="fs-2 text-center"> Sales Performance</h2>
    <h2> Total Sales: 136, 435.49  </h2>   <h2> Revenue: 250, 435.49  </h2>  <h2> Profit: 20, 435.49  </h2> 
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
  <h1 className="fs-2 text-center"> Sales Data</h1>
  <Footer></Footer>

   
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>

    </div>
  )
}
