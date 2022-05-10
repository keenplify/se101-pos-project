import Head from "next/head";
import { Card, Container, FormControl, InputGroup, Table } from "react-bootstrap";
import styles from "../styles/inventory.module.css";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { CategoriesQueries } from "../queries/categories";
import { BACKEND } from "../helpers";
import Link from "next/link";
import AddCategory from "../components/addCategory";
import { VariantsQueries } from "../queries/variants";
import { ChangeableImage } from "../components/ChangeableImage";
import EditVariant from "../components/editVariant";
import DeleteVariant from "../components/deleteVariant";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function InventoryAll({ token, employee, _variants }) {
  const [keyword, setKeyword] = useState("");
  const [variants, setVariants] = useState(_variants); // Use SSRed data as variant default
  const [debouncedKeyword] = useDebounce(keyword, 1000); // Wait 1000 before searching (debounced search)

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
      setVariants(_variants);
    }
  }, [debouncedKeyword])

  return (
    <div className="d-flex flex-column">
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>
      <NavBar employee={employee} token={token}></NavBar>
      <div
        className="mt-3 mb-2 text-center"
        style={{ width: "100%"}}
      >
        <label
          className="text-center "
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: 'Roboto',
          }}
        >
          ALL PRODUCT VARIANTS{" "}
        </label>

      </div>

          <Container className="col-6">
      <div className="d-flex p-1">
          <InputGroup >
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
        </Container>

      <div className="container col-lg-10 justify-content-center my-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Variant Name</th>
              <th>Category Name</th>
              <th>Stock</th>
              {employee.type == "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, key) => (
              <tr key={key}>
                <td>
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
                <td>{variant.product.name}</td>
                <td>{variant.name}</td>
                <td>{variant.product.category.name}</td>
                <td>{variant.stock}</td>
                {employee.type == "ADMIN" && (
                  <td>
                    <EditVariant token={token} variant={variant} />
                    <DeleteVariant token={token} variant={variant} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Footer></Footer>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { props } = await AuthenticateEmployee(context);

  if (!props.employee) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const _variants = (await VariantsQueries.getAll(props.token)).data.variants;

  return {
    props: {
      ...props,
      _variants,
    },
  };
}