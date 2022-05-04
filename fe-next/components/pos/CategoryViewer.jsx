import { useEffect, useState } from "react";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { BACKEND } from "../../helpers";
import { ProductsQueries } from "../../queries/products";
import { TransactedVariantsQueries } from "../../queries/transactedvariants";
import { VariantCard } from "./VariantCard";

function getWindowDimensions() {
  if (typeof window == "undefined") return { width: 0, height: 0 };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const POSCategoryViewer = ({
  token,
  cartItems,
  category,
  setCartItems,
  transaction,
}) => {
  const [products, setProducts] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (category) {
      ProductsQueries.getByCategoryPaginate(token, category.id).then((res) => {
        setProducts(res.data.products);
      });
    }
  }, [category]);

  return (
    <div className="mt-2">
      {products.map(
        (product, key) =>
          product.variants.length > 0 && (
            <div className="my-2" key={key}>
              <h4>
                <Badge bg="info">{product.name}</Badge>
              </h4>
              <Row xs={2} md={3} className="g-4">
                {product.variants.map((variant, key) => (
                  <VariantCard
                    token={token}
                    key={key}
                    variant={variant}
                    TransactedVariantsQueries={TransactedVariantsQueries}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    transaction={transaction}
                    windowDimensions={windowDimensions}
                  />
                ))}
              </Row>
            </div>
          )
      )}
    </div>
  );
};
