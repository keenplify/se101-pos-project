import { Card, Col, InputGroup, Row, Table, Button } from "react-bootstrap";
import {
  FaMinusCircle,
  FaPlusCircle,
  FaShoppingCart,
  FaTrashAlt,
} from "react-icons/fa";
import styles from "../../styles/Home.module.css";

export const POSCartViewer = ({ cartItems, setCartItems }) => {
  const totalPrice =
    Math.round(
      cartItems
        .map((cart) => cart.variant.price * cart.quantity)
        .reduce((a, b) => a + b, 0) * 100
    ) / 100;

  return (
    <Card className={styles.cartCard}>
      <Card.Body>
        <Row>
          <Col className="text-center">
            <FaShoppingCart></FaShoppingCart> Cart
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Table borderless>
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, key) => (
                  <tr key={key}>
                    <td>
                      <div
                        style={{
                          width: "64px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.variant.name}
                      </div>
                    </td>
                    <td>
                      <InputGroup>
                        <InputGroup.Text
                          className={styles.inputGroupText}
                          onClick={() => {
                            setCartItems((o) => {
                              const f = o.find(
                                (e) => e.variant.id == item.variant.id
                              );
                              if (f.quantity > 1) f.quantity--;
                              return [...o];
                            });
                          }}
                        >
                          <FaMinusCircle></FaMinusCircle>
                        </InputGroup.Text>
                        {item.quantity}
                        <InputGroup.Text
                          className={styles.inputGroupText}
                          onClick={() => {
                            setCartItems((o) => {
                              o.find((e) => e.variant.id == item.variant.id)
                                .quantity++;
                              return [...o];
                            });
                          }}
                        >
                          <FaPlusCircle></FaPlusCircle>
                        </InputGroup.Text>
                      </InputGroup>
                    </td>
                    <td>
                      &#8369;
                      {Math.round(item.quantity * item.variant.price * 100) /
                        100}
                    </td>
                    <td>
                      <div
                        onClick={() => {
                          console.log("yet");
                          setCartItems((o) => {
                            const filtered = o.filter(
                              (e) => e.variant.id != item.variant.id
                            );
                            return [...filtered];
                          });
                        }}
                      >
                        <FaTrashAlt
                          className={styles.cursorPointer}
                        ></FaTrashAlt>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr />
        <Row className="px-5">
          <Col>
            <strong>Total Amount</strong>
          </Col>
          <Col className={styles.textRight}>
            <strong>
              &#8369;
              {totalPrice}
            </strong>
          </Col>
        </Row>
        <Row>
          <Col className="d-grid gap-2 mt-4">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Checkout
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
