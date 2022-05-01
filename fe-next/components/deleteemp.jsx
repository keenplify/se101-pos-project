import { useRouter } from "next/router";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import { EmployeesQueries } from "../queries/employees";
export default function DeleteEmployee({ token, employee }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        class="btn btn-sm btn-danger mx-1"
        onClick={handleShow}
      >
        <MdDelete></MdDelete>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>You are about to delete a employee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          This will delete your employee permanently removed and you won't be
          able to see them again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              try {
                await EmployeesQueries.delete(token, employee.id);
                router.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
