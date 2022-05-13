import { useRouter } from "next/router";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import { VariantsQueries } from "../queries/variants";
export default function DeleteVariant({ token, variant }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-danger mx-1"
        onClick={handleShow}
        title="Delete Variant"
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
          <Modal.Title>You are about to delete a variant</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          This will delete your variant permanently removed and you won't be
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
                await VariantsQueries.delete(token, variant.id);
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
