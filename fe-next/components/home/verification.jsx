import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Modal, ModalHeader} from "react-bootstrap"

export function Verification() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return (
      <>
     <button type="button" class="btn btn-primary" onClick={handleShow}>Yes</button>
     <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader closeButton>

        </ModalHeader>
      <Modal.Body >
      <h4 className="text-center">Transaction Complete!</h4>
      <Modal.Footer>
            <div className='px-5'>
              <Button variant="primary">Print Receipt</Button>
            </div>
      </Modal.Footer>


          </Modal.Body>
      </Modal>
      </>
    );
  }