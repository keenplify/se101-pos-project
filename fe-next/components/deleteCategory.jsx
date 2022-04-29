import { useRouter } from "next/router";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import { CategoriesQueries } from "../queries/categories";
export default function DeleteCategory({ token, category }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        class="btn btn-sm btn-danger mt-1 w-100"
        onClick={handleShow}
      >
        <MdDelete></MdDelete> Delete Category
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>You are about to delete a category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          This will delete your category permanently removed and you won't be
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
                await CategoriesQueries.delete(token, category.id);
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
