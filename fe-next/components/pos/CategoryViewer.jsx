import { useEffect, useState } from "react";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { BACKEND } from "../../helpers";
import { ProductsQueries } from "../../queries/products";

export const POSCategoryViewer = ({ token, category, setCartItems }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsQueries.getByCategoryPaginate(token, category.id).then((res) => {
      setProducts(res.data.products);
    });
  }, [category]);

  return (
    <div className="mt-2">
      {products.map(
        (product) =>
          product.variants.length > 0 && (
            <div className="my-2">
              <h4>
                <Badge bg="info">{product.name}</Badge>
              </h4>
              <Row xs={1} md={3} className="g-4">
                {product.variants.map((variant) => (
                  <Col>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={BACKEND + variant.image.location}
                      />
                      <Card.Body>
                        <Card.Title>{variant.name}</Card.Title>
                        <div className="d-flex">
                          <span className="btn btn-outline-secondary mx-1">
                            ₱{variant.price}
                          </span>
                          <Button
                            variant="primary"
                            className="flex-grow-1 mx-1"
                            onClick={() => {
                              setCartItems((o) => {
                                for (let index = 0; index < o.length; index++) {
                                  const e = o[index];
                                  if (e?.variant?.id == variant?.id) {
                                    e.quantity = e.quantity + 1;
                                    return [...o];
                                  }
                                }
                                return [...o, { quantity: 1, variant }];
                              });
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )
      )}
    </div>
  );
};
