import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  InputGroup,
  Button,
  Form,
  FormControl,
  ButtonGroup,
  Tabs,
  Tab,
} from "react-bootstrap";
import Image from "next/image";
import {
  FaPlusCircle,
  FaMinusCircle,
  FaTrashAlt,
  FaShoppingCart,
  FaSearch,
  FaBarcode,
} from "react-icons/fa";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { CheckoutModal } from "../components/home/checkout";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { CategoriesQueries } from "../queries/categories";
import { ProductsQueries } from "../queries/products";
import { VariantsQueries } from "../queries/variants";
import { POSCategoryViewer } from "../components/pos/CategoryViewer";
import { POSCartViewer } from "../components/pos/CartViewer";
import axios from "axios";
import { BACKEND } from "../helpers";
import { TransactionsQueries } from "../queries/transactions";
import { POSSearch } from "../components/pos/POSSearch";

export default function Home({
  employee,
  categories,
  token,
  activeTransaction,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [cartItems, setCartItems] = useState(
    activeTransaction.transactedvariants
      ? activeTransaction.transactedvariants.map((transactedVariant) => {
          return {
            quantity: transactedVariant.quantity,
            variant: transactedVariant.variant,
            transactedVariant,
          };
        })
      : []
  );

  return (
    <div>
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>
      <NavBar employee={employee} token={token}></NavBar>

      <Container fluid>
        <Row className="p-5">
          <Col xs={{ order: 2 }} md={{ span: 9, order: 1 }} className="py-2">
            {/* Column for product view */}
            <Tabs defaultActiveKey={0}>
              {categories.map((category, key) => (
                <Tab eventKey={key} title={category.name}>
                  <POSCategoryViewer
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    category={category}
                    token={token}
                    transaction={activeTransaction}
                  />
                </Tab>
              ))}
              <Tab eventKey="search" title="Search">
                <POSSearch
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  transaction={activeTransaction}
                  token={token}
                />
              </Tab>
            </Tabs>
          </Col>
          <Col
            xs={{ order: 1 }}
            md={{ span: 3, order: 2 }}
            className="position-relative"
          >
            <POSCartViewer
              cartItems={cartItems}
              setCartItems={setCartItems}
              setModalShow={setModalShow}
              transaction={activeTransaction}
              token={token}
            />
          </Col>
        </Row>
      </Container>

      <CheckoutModal
        token={token}
        modalShow={modalShow}
        setModalShow={setModalShow}
        transaction={activeTransaction}
        cartItems={cartItems}
      />

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

  // Check if a transaction is active in localstorage
  const activeTransactionId = context?.req.cookies?.activeTransactionId;

  // Create new transaction fn
  const createNewTransaction = async () => {
    activeTransaction = (await TransactionsQueries.add(props.token)).data
      .newTransaction;
    context.res.cookie("activeTransactionId", activeTransaction.id);
  };

  // If no active transaction is present, create a new active transaction. Else, get active transaction.
  let activeTransaction;
  if (!activeTransactionId) {
    await createNewTransaction();
  } else {
    try {
      activeTransaction = await (
        await TransactionsQueries.getById(props.token, activeTransactionId)
      ).data.transaction;
    } catch (error) {
      // Create new transaction if error.
      await createNewTransaction();
    }
  }

  //Get all categories
  let categories = (await CategoriesQueries.getAll(props.token)).data
    .categories;

  return {
    props: {
      ...props,
      categories,
      activeTransaction,
    },
  };
}
