import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { MdAddToPhotos } from "react-icons/md";
import { BACKEND } from "../helpers";

export const ChangeableImage = ({
  token,
  employee,
  selectorId,
  query,
  image,
  width = "100%",
  height = "100%",
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedImage) return null;

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSelectedImage(null);
    setShow(true);
  };

  const imgSrc=previewImage
  ? previewImage
  : image
  ? BACKEND + image
  : "/img/blank.jpg";

  return (
    <Fragment>
      <div
        className={"position-relative bg-light rounded shadow-sm"}
        style={{ width, height }}
      >
        <img
          className={"img-changeable rounded"}
          src={image ? BACKEND + image : "/img/blank.jpg"}
        />
        <Button
          variant="info "
          size="sm"
          className="position-absolute"
          style={{ right: "1em", bottom: "1em", fontSize: ".5em" }}
          onClick={handleShow}
          disabled={employee.type !== "ADMIN"}
        >
          <MdAddToPhotos /> Change Photo
        </Button>
      </div>

      <Modal show={show} onHide={() => !isSubmitting && handleClose()}>
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <h6>Current Image</h6>
          <div
            style={{ width: "256px", height: "256px" }}
            className="bg-light rounded align-self-center shadow-lg mb-3"
          >
            <Image
              loader={() => imgSrc}
              className={"img-changeable rounded"}
              src={imgSrc}
              width={width}
              height={height}
              layout="responsive"
            />
          </div>
          <Form.Group className="mb-3">
            <Form.Label>New Image File</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const formData = new FormData();
              formData.append("image", selectedImage);

              query(token, selectorId, formData);
              setIsSubmitting(true);
              setTimeout(() => router.reload(), 1500);
            }}
            disabled={!selectedImage || isSubmitting}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
