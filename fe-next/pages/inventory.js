import Head from 'next/head'
import {Card} from "react-bootstrap"
import styles from '../styles/inventory.module.css'
import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'



export default function Inventory() {
  return (
    <div>
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>
    <NavBar></NavBar>
    
      <h1 className="text-center">Heading </h1>
      <div className="container col-lg-10 justify-content-center ">
        <div className="row">
        
        <div className="col-md-3 py-3">
        <a className="text-decoration-none text-black" href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
          <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid' alt='Sample' />
          <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>


    <div className="col-md-3 py-3">
        <a className="text-decoration-none text-black" href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
      <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid' alt='Sample' />
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>


    <div className="col-md-3 py-3">
        <a className="text-decoration-none text-black" href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
      <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid' alt='Sample' />
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>


    <div className="col-md-3 py-3">
        <a className="text-decoration-none text-black" href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
      <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid' alt='Sample' />
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>

    <div className="col-md-3 py-2">
        <a className="text-decoration-none text-black" href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
      <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid' alt='Sample' />
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>

    <div className="col-md-3 py-2">
        <a className="text-decoration-none text-black" href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
      <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid' alt='Sample' />
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>

    <div className="col-md-3 py-2">
        <a className="text-decoration-none text-black " href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
      <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid ' alt='Sample' />
      <div className='mask ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>

    <div className="col-md-3 py-2">
        <a className="text-decoration-none text-black" href="/inventorylist">
        <div className='bg-image' style={{ maxWidth: '24rem' }}>
      <img src='/img/93f895b604a807de99d813ec8a2e53db.jpg' className='img-fluid' alt='Sample' />
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>Juices</p>
        </div>
      </div>
    </div>
      </a>
    </div>



        </div>
      </div>


    <Footer></Footer>
    </div>
  )
}
