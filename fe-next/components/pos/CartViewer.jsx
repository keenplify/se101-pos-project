import {
  Card,
  Col,
  InputGroup,
  Row,
  Table,
  Button,
  Badge,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
  Accordion,
} from "react-bootstrap";
import {
  FaMinusCircle,
  FaPlusCircle,
  FaShoppingCart,
  FaTrashAlt,
} from "react-icons/fa";
import { TransactedVariantsQueries } from "../../queries/transactedvariants";
import styles from "../../styles/Home.module.css";
import { BarcodeScannerModal } from "./BarcodeScannerModal";
import { ChangeTransactionForm } from "./ChangeTransactionForm";
import { DeleteTransactionModal } from "./DeleteTransactionModal";

export const POSCartViewer = ({
  token,
  cartItems,
  setCartItems,
  setModalShow,
  transaction,
}) => {
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
              <tbody style={{ fontSize: ".8em" }}>
                {cartItems.map((item, key) => (
                  <tr key={key}>
                    <td data-label="Variant" style={{
                          width: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                        {item.variant.name}
                    </td>
                    <td
                      data-label="Quantity"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                      className="d-flex"
                      data-label="Price"
                    >
                      <div className="ms-auto ms-md-0">
                        <InputGroup>
                          <InputGroup.Text
                            className={styles.inputGroupText}
                            onClick={async () => {
                              if (transaction.state !== "PROCESSING") return;
                              const newCartItems = [...cartItems];
                              const f = newCartItems.find(
                                (e) => e.variant.id == item.variant.id
                              );
                              if (f.quantity > 1) {
                                f.quantity--;

                                await TransactedVariantsQueries.editQuantityById(
                                  token,
                                  f.transactedVariant.id,
                                  f.quantity
                                );
                              }

                              setCartItems(newCartItems);
                            }}
                            style={{
                              display:
                                transaction.state !== "PROCESSING"
                                  ? "none"
                                  : undefined,
                            }}
                          >
                            <FaMinusCircle></FaMinusCircle>
                          </InputGroup.Text>
                          <span style={{margin: "0 .5rem"}}>{item.quantity}</span>
                          <InputGroup.Text
                            className={styles.inputGroupText}
                            onClick={async () => {
                              if (transaction.state !== "PROCESSING") return;
                              const newCartItems = [...cartItems];

                              const f = newCartItems.find(
                                (e) => e.variant.id == item.variant.id
                              );
                              if (f.quantity >= f.variant.stock) return;
                              f.quantity++;

                              TransactedVariantsQueries.editQuantityById(
                                token,
                                f.transactedVariant.id,
                                f.quantity
                              );

                              setCartItems(newCartItems);
                            }}
                            style={{
                              display:
                                transaction.state !== "PROCESSING"
                                  ? "none"
                                  : undefined,
                            }}
                          >
                            <FaPlusCircle></FaPlusCircle>
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      
                    </td>
                    <td data-label="Price">
                      &#8369;
                      {Math.round(item.quantity * item.variant.price * 100) /
                        100}
                    </td>
                    <td  data-label="Action">
                      <div
                        onClick={async () => {
                          if (transaction.state !== "PROCESSING") return;
                          const filtered = [...cartItems].filter((e) => {
                            const filter = e.variant.id != item.variant.id;

                            if (!filter) {
                              TransactedVariantsQueries.deleteById(
                                token,
                                e.transactedVariant.id
                              ).then();
                            }

                            return filter;
                          });

                          setCartItems([...filtered]);
                        }}
                        style={{
                          display:
                            transaction.state !== "PROCESSING"
                              ? "none"
                              : undefined,
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
            <OverlayTrigger
              placement="top"
              overlay={
                transaction.state !== "PROCESSING" ? (
                  <Tooltip>
                    You cannot modify this transaction because it is already{" "}
                    <Badge bg="primary">{transaction.state}</Badge>
                  </Tooltip>
                ) : (
                  <Tooltip>Finalize transaction</Tooltip>
                )
              }
            >
              <span className="d-flex w-100 flex-column">
                <Button
                  variant={
                    transaction.state !== "PROCESSING"
                      ? "outline-dark"
                      : "success"
                  }
                  onClick={() => setModalShow(true)}
                  className="w-100 mb-2"
                  disabled={transaction.state !== "PROCESSING"}
                >
                  Checkout
                </Button>
              </span>
            </OverlayTrigger>
            <BarcodeScannerModal
              token={token}
              cartItems={cartItems}
              setCartItems={setCartItems}
              transaction={transaction}
              disabled={transaction.state !== "PROCESSING"}
            />
            <DeleteTransactionModal />
            <ChangeTransactionForm transaction={transaction} />
          </Col>
        </Row>
        {transaction.state !== "PROCESSING" && (
          <div style={{ fontSize: ".8em" }}>
            <Row>
              <Col xs={6}>
                {" "}
                <strong>State:</strong> {transaction.state}
              </Col>
              <Col xs={6}>
                {" "}
                <strong>Payment Type:</strong> {transaction.type}
              </Col>
            </Row>
            {transaction?.remarks?.length > 0 && (
              <div>
                <strong>Remarks:</strong> {transaction.remarks}
              </div>
            )}
            <Row></Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
