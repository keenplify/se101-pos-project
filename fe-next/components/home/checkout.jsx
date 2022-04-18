import { Modal, Button, Row, Col, Form, Table} from "react-bootstrap"

export function CheckoutModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Payment Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="px-1">
            <Row>
              <Col md={12} lg={6}>
              <strong> Order ID: </strong> 
              </Col>
              <Col md={12} lg={6}>
               <strong> Payment Type: </strong>
              </Col>
            </Row>

            <Row>
            <Col md={12} lg={6}>
                GUID-2022123456789
              </Col>
              <Col md={6} lg={6}>
                <Form.Select aria-label="Default select example" size="sm">
                    <option>Select payment method</option>
                    <option value="1">Cash</option>
                    <option value="2">Gcash</option>
                    <option value="3">Paymaya</option>
                </Form.Select>
            </Col>
            </Row>   
            <Row>
            <Col md={12} lg={6}>
               <strong> Date: </strong>
            </Col>
            </Row>
            <Row>
            <Col md={12} lg={6}>
               April 15, 2022  5:06 PM
            </Col>
            </Row>
          </div>
            </Modal.Body>
            <Modal.Footer>
            <div className="px-5">
            <Row>
                  <Col>
                    <Table borderless>
                      <thead>
                        <tr>
                          <th>Qty</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Vape 1</td>
                          <td>1,000</td>
                        </tr>
                        <tr>
                          <td>Vape 1</td>
                          <td>1,000</td>
                        </tr>
                        <tr>
                          <td>Vape 1</td>
                          <td>1,000</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
            </div>
            <div className="d-grid gap-2">
                <Row>
                <Button 
                 variant="success" size="md">
                    Proceed Transaction
                </Button>
                </Row>
                <Row>
                <Button 
                variant="danger" size="md">
                    Cancel Transaction
                 </Button>
                </Row>

            </div>
            </Modal.Footer>
        </Modal>
    );
}
