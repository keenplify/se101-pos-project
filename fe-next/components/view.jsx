import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { MdDownload, MdGridView } from "react-icons/md";
import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import { BACKEND, COMPANY_NAME } from "../helpers";
import AddVariant from "./addVariant";
import { ChangeableImage } from "./ChangeableImage";
import { VariantsQueries } from "../queries/variants";
import QrCode from "react-qr-code";
import EditVariant from "./editVariant";
import DeleteVariant from "./deleteVariant";
import toImg from 'react-svg-to-image';
import { newUniqueId } from "../helpers/newid";
import { ImageWrapper } from "../helpers/ImageWrapper";

export default function View({ product, employee, token }) {
  const [show, setShow] = useState(false);

  const downloadQr = ( {qrRef, product, variant}) => {
    toImg('#'+qrRef.current, `qr-${product.name}-${variant.name}-${new Date().toLocaleDateString()}`, {
      scale: 3,
      format: 'png',
      download: true,
    })
  };

  return (
    <>
      <Button
        className="btn btn-sm btn-primary mx-1"
        onClick={() => setShow(true)}
      >
        <MdGridView></MdGridView>
      </Button>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}'s Variants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="col-lg-12 my-3 rounded-3">
            <Row>
              <Col className="col-lg-3">
                <div className="w-100 aligned">
                  <img
                    src={
                      product?.variants[0] &&
                      ImageWrapper(
                        product.variants[0].image?.location
                      )
                    }
                    className="img-fluid rounded bg-white"
                    style={{
                      width: "12em",
                      height: "12em",
                      maxHeight: "12em",
                      maxWidth: "12em",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Col>

              <Col className="col-lg-7">
                <span>
                  <p>
                    <b>Product Name: </b>
                    {product.name}
                  </p>
                  <p>
                    <b>Product ID: </b>
                    {product.id}
                  </p>
                </span>
              </Col>

              <Col>
                <div className="text-end">
                  <AddVariant token={token} product={product} />
                </div>
              </Col>
            </Row>

            <Table striped bordered hover className="table table-image mt-3">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Barcode</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.variants.map((variant, key) => {
                  const qrRef = useRef(newUniqueId('qr-'));
                  return (
                    <tr key={key}>
                      <th scope="row">{variant.id}</th>
                      <td className="w-25">
                        <ChangeableImage
                          token={token}
                          employee={employee}
                          query={VariantsQueries.changeImage}
                          selectorId={variant.id}
                          image={variant?.image?.location}
                          width="7em"
                          height="7em"
                        />
                      </td>
                      <td>{variant.name}</td>
                      <td>{variant.stock}</td>
                      <td>
                        <QrCode
                          value={`${COMPANY_NAME}-.-${variant.id}-.-INVENTORY`}
                          size={128}
                          id={qrRef.current}
                        />
                      </td>
                      <td className="py-2">
                        <EditVariant token={token} variant={variant} />
                        <DeleteVariant token={token} variant={variant} />
                        <Button
                          type="button"
                          className="btn btn-sm btn-info mx-1"
                          title="Download QR Code"
                          onClick={()=>downloadQr({qrRef, product, variant})}
                        >
                          <MdDownload />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
