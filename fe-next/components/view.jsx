import { useRouter } from 'next/router'
import { useState } from 'react'
import {MdGridView} from "react-icons/md"
import AddItem from '../components/addItem'
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
export default function View() {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      {values.map((v, idx) => (
        <Button class="btn btn-sm btn-primary" onClick={() => handleShow(v)}><MdGridView></MdGridView></Button>

      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Variants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container className="col-lg-12 my-3 rounded-3">  
    <Row >
     <Col className="col-lg-3"> 
     <div className="w-100 aligned">
     <img src="/img/images.jpg"  className="img-fluid img-thumbnail shadow"/>
     </div>
    </Col>

    <Col className="col-lg-7"> 
     <span><p><b>Product Name: </b>Flex Vape Juice</p>
      <p><b>Product ID: </b>1029</p>
     <p><b>Description: </b>Flex 100ml Fat Clouds Vape Juice E Liquid Vaping Low Strength High VG Legit ejuice eliquid Dragondrops</p></span>
     
    </Col>

    

    <Col>
    <div className="text-end">
      <AddItem></AddItem>
      </div>
    </Col>
  </Row>
  
    

  <Table striped bordered hover className="table table-image mt-3" >
  <thead >
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Image</th>
      <th scope="col">Product Name</th>
      <th scope="col">Variants</th>
      <th scope="col">Date Added</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td className="w-25">
      <img src="/img/images.jpg"  className="img-fluid img-thumbnail" alt="Sheep"/></td>
      <td>Flex Vape Juice</td>
      <td>Love Potion</td>
      <td>03/22/2019</td>
      <td class="py-2">
        
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td className="w-25">
    <img src="/img/Game-On-Juice-A3-Posters-Landscape-Nic-Salts-web.png" className="img-fluid img-thumbnail" alt="Sheep"/></td>
      <td>Flex Vape Juice</td>
      <td>Love Potion</td>
      <td>03/22/2019</td>
      <td class="py-2">
    
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td className="w-25">
      <img src="/img/images.jpg"  className="img-fluid img-thumbnail" alt="Sheep"/></td>
      <td>Flex Vape Juice</td>
      <td>Love Potion</td>
      <td>03/22/2019</td>
      <td class="py-2">
    
      </td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td className="w-25">
    <img src="/img/Game-On-Juice-A3-Posters-Landscape-Nic-Salts-web.png" className="img-fluid img-thumbnail" alt="Sheep"/></td>
      <td>Flex Vape Juice</td>
      <td>Love Potion</td>
      <td>03/22/2019</td>
      <td class="py-2">
     
      </td>
    </tr>
  </tbody>
</Table>

</Container>   

        </Modal.Body>
      </Modal>
    </>
  );
  }
  
