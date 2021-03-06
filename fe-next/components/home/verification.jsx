import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Modal, ModalHeader} from "react-bootstrap"
import Cookies from 'universal-cookie';
import { TransactionsQueries } from '../../queries/transactions';

export function Verification({onProceed, token, transaction}) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const cookies = new Cookies();
    cookies.remove("activeTransactionId");
    router.reload();
  };
  const handleShow = () => setShow(true);
  
    return (
      <>
     <button type="button" className="btn btn-primary" onClick={()=> {
       onProceed();
       handleShow();
     }}>Yes</button>
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
              <Button variant="primary" className="mx-1" onClick={()=>{
                TransactionsQueries.generateReceipt(token, transaction.id).then((res)=> {
                  if (res.data?.location) {
                    let win = window.open(res.data.location);
                    win.focus();
                  }
                })
              }}>Print Receipt</Button>
              <Button variant="success" onClick={handleClose} className="mx-1">New Transaction</Button>
            </div>
      </Modal.Footer>


          </Modal.Body>
      </Modal>
      </>
    );
  }