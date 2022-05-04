import { useRouter } from 'next/router'
import { useState } from 'react'
import {Button, Modal, ModalFooter, ModalHeader} from "react-bootstrap"
import { Verification } from "../home/verification";


export default function Transaction({onProceed, canProceed}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return (
      <>
     <button type="button" className="btn btn-primary" onClick={handleShow} disabled={!canProceed}>Proceed Transaction</button>
     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>

        </Modal.Header>
      <Modal.Body>
      <h5 className="text-center">  Are you sure you want to proceed?</h5>
      <Modal.Footer>
      <Verification onProceed={onProceed}></Verification>
                <Button variant="secondary" onClick={handleClose}>No</Button>
      </Modal.Footer>

          </Modal.Body>
      </Modal>
      </>
    );
  }