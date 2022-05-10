import { useEffect, useState } from "react";
import { Button, Card, Col, Badge } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { BACKEND } from "../../helpers";
import { ProductsQueries } from "../../queries/products";
import { TransactedVariantsQueries } from "../../queries/transactedvariants";

export function VariantCard({
  token,
  variant,
  TransactedVariantsQueries,
  cartItems,
  setCartItems,
  transaction,
  windowDimensions,
}) {
  const calculateStock = () => {
    const _cartItem = cartItems.find((item) => item.variant.id == variant.id);
    if (_cartItem) return variant.stock - _cartItem.quantity;
    else return variant.stock;
  };
  const [calcStock, setCalcStock] = useState(calculateStock());

  useEffect(() => {
    setCalcStock(calculateStock());
  }, [cartItems, variant]);

  return (
    <Col>
      <Card className="shadow">
        <div style={{ position: "relative" }}>
          <Card.Img
            variant="top"
            src={
              variant.image?.location
                ? BACKEND + variant.image.location
                : "/img/blank.png"
            }
            className="img-fluid rounded bg-transparent"
            style={{
              width: "100%",
              height: "10em",
              maxHeight: "10em",
              objectFit: "contain",
            }}
          />
          {transaction.state === "PROCESSING" && (
            <Badge
              bg={calcStock > 0 ? "dark" : "danger"}
              style={{
                display: "inline-block",
                position: "absolute",
                right: "2%",
                bottom: "2%",
              }}
            >
              {calcStock} stocks
            </Badge>
          )}
        </div>
        <Card.Body>
          <Card.Title 
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {variant.name}
          </Card.Title>
          <div className="d-flex">
            <span className="text-dark btn btn-outline-secondary mx-1">
              ₱{variant.price}
            </span>
            <Button
              variant={calcStock > 0 ? "primary" : "outline-dark"}
              className="btn-sm flex-grow-1 mx-1"
              onClick={async () => {
                try {
                  for (let index = 0; index < cartItems.length; index++) {
                    const e = cartItems[index];
                    if (e?.variant?.id == variant?.id) {
                      // Return add quantity when variant is found in the cartItem
                      e.quantity = e.quantity + 1;
                      TransactedVariantsQueries.editQuantityById(
                        token,
                        e.transactedVariant.id,
                        e.quantity
                      );
                      setCartItems([...cartItems]);
                      return;
                    }
                  }
                  // If not, create new cartItem.
                  const transactedVariant = await TransactedVariantsQueries.add(
                    token,
                    variant.id,
                    1,
                    transaction.id
                  );
                  setCartItems([
                    ...cartItems,
                    {
                      quantity: 1,
                      variant,
                      transactedVariant:
                        transactedVariant.data.newTransactedVariant,
                    },
                  ]);
                  return;
                } catch (error) {
                  console.log(error);
                }
              }}
              disabled={calcStock <= 0 || transaction.state == "PAID"}
            >
              {windowDimensions.width <= 576 ? <FiPlus /> : "Add to Cart"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
