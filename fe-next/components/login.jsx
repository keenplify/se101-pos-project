import { useRouter } from 'next/router'
import { useState } from 'react'
import {MdDelete} from "react-icons/md"
import {Card,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
import { BACKEND } from '../helpers';
export default function LoginCard({employee}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return (
      <>
      <br/>
    <div>
      <Card style={{
      justifyContent:"center",
      placeItems:"center",
      marginTop:"60px",
      width:"25vh",
      padding:"8px 1px", 
      border:"3px solid #DFE1E4",
      borderRadius:"20px",
      fontSize:"2.5vh",
      fontWeight:"bold",
      overflow:"auto",
      boxShadow:"5px 5px 10px grey"

      }}
      onClick = {handleShow}>
      {typeof employee.images !== undefined && employee?.images?.length>0 ? 
    
    
    <Card.Img style={{
      borderRadius:"50%",
      width:"70%",
      height:"70%",
      border:"3px solid #DFE1E4"
      }}variant="top" src={BACKEND + employee.images[0].location}/>:<span>Hello Aczell</span>}
 
      <Card.Body>
        
        <Card.Text className="text-center">
      {employee.firstName} {employee.lastName}
        </Card.Text>
    
      </Card.Body></Card></div>
     
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>You are about to log in as Genesis Admin</Modal.Title>
          
        </Modal.Header>
        <Modal.Body className="text-center">
        <Form>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      <b>Password</b>
    </Form.Label>
    <Col sm="10">
      <Form.Control type="password" placeholder="Password" />
    </Col>
  </Form.Group>
</Form>
        </Modal.Body>
       
        <Modal.Footer>
          <Button style={{
            borderRadius:"20px",
            padding:"8px 14px",
            fontWeight:"bold"
          }}variant="secondary" onClick={handleClose}>
            Close
          </Button>
         <Button style={{
            borderRadius:"20px",
            padding:"8px 14px",
            fontWeight:"bold"
          }}variant="primary" onClick={handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
