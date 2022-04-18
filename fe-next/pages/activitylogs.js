import Head from 'next/head'
import {Table} from "react-bootstrap"

import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'


export default function activitylogs() {
   return <><><Head>
       <title>Vaperous M4ster - POS Website</title>
       <meta name="description" content="Generated by create next app" />
       <link rel="icon" href="/img/Logo.jpg" />
   </Head><NavBar></NavBar>
   <div> 
        <h1 className="fs-2 text-center"> Activity Logs </h1>
        </div>
        <div>
        <h1>Vaperous Master's Activity Logs</h1>
        </div>
   <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>ID</th>
      <th>DATE CREATED</th>
      <th>CREATED BY</th>
      <th>DESCRIPTION</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>January 1, 2022</td>
      <td> bornok</td>
      <td>this transaction is verify</td>
    </tr>
    <tr>
    <td>2</td>
      <td>January 1, 2022</td>
      <td> bornok</td>
      <td>this transaction is verify</td>
    </tr>
    <tr>
    <td>3</td>
      <td>January 1, 2022</td>
      <td> bornok</td>
      <td>this transaction is verify</td>
    </tr>
    <tr>
    <td>4</td>
      <td>January 1, 2022</td>
      <td> bornok</td>
      <td>this transaction is verify</td>
    </tr>
    <tr>
    <td>5</td>
      <td>January 1, 2022</td>
      <td> bornok</td>
      <td>this transaction is verify</td>
    </tr>
    <tr>
    <td>6</td>
      <td>January 1, 2022</td>
      <td> bornok</td>
      <td>this transaction is verify</td>
    </tr>
    <tr>
    <td>7</td>
      <td>January 1, 2022</td>
      <td> bornok</td>
      <td>this transaction is verify</td>
    </tr>
  </tbody>
</Table>
</>
<Footer></Footer></>
   
   
}

     
    