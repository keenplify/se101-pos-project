import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

export const DeleteTransactionModal = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <Fragment>
      <Button variant="danger" onClick={() => setShow(true)}>
        New Transaction
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            You are trying to change your transaction ID.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will change your transaction ID and clear your cart. Are you sure
          to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const cookies = new Cookies();

              cookies.remove("activeTransactionId");
              router.reload();
            }}
          >
            New Transaction
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
