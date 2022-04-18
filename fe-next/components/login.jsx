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
    <Card style={{ width: '15rem' }} onClick = {handleShow}>
      {typeof employee.images !== undefined && employee?.images?.length>0 ? 
    
    
    <Card.Img variant="top" src={BACKEND + employee.images[0].location}/>:<span>Hello Aczell</span>}
 
      <Card.Body>
        
        <Card.Text className="text-center">
      {employee.firstName} {employee.lastName}
        </Card.Text>
    
      </Card.Body>
    </Card> 
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>You are about to delete a product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">This will delete your product permanently removed and you won't be able to see them again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
