import { useEffect, useState } from "react";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebounce } from "use-debounce";
import { TransactedVariantsQueries } from "../../queries/transactedvariants";
import { VariantsQueries } from "../../queries/variants";
import { VariantCard } from "./VariantCard";

function getWindowDimensions() {
  if (typeof window == "undefined") return { width: 0, height: 0 };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const POSSearch = ({
  token,
  cartItems,
  category,
  setCartItems,
  transaction,
}) => {
  const [keyword, setKeyword] = useState("");
  const [variants, setVariants] = useState([]); // Use SSRed data as variant default
  const [debouncedKeyword] = useDebounce(keyword, 1000); // Wait 1000 before searching (debounced search)

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

  useEffect(()=> {
    if (debouncedKeyword.length > 0) {
      //Get data from search then set it as variant state
      VariantsQueries.search(token, debouncedKeyword).then((res)=> {
        if (res.data?.variants) {
          setVariants(res.data.variants)
        }
      });
    } else {
      // If no keyword is typed, show original SSRed data
      setVariants([]);
    }
  }, [debouncedKeyword])
  
  return (
    <Container>
      <div className="d-flex p-2">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <AiOutlineSearch></AiOutlineSearch>
          </InputGroup.Text>
          <FormControl
            placeholder="Search"
            aria-label="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </InputGroup>
      </div>
      <Row xs={2} md={3} className="g-4">
        {variants.map((variant, key) => (
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
    </Container>
  );
};
