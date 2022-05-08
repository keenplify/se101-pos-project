import Head from "next/head";
import { Table, Container } from "react-bootstrap";
import styles from "../styles/inventory.module.css";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { CategoriesQueries } from "../queries/categories";
import { BACKEND } from "../helpers";
import Link from "next/link";
import AddCategory from "../components/addCategory";
import { FaThList } from "react-icons/fa";


export default function Inventory({ token, employee, categories }) {
  return (
    <div className="d-flex flex-column">
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>
      <NavBar employee={employee}></NavBar>

<Container className="py-5">
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Variant ID</th>
      <th>Image</th>
      <th>Category Name</th>
      <th>Product Name</th>
      <th>Variant Name</th>
      <th>Stocks</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>1990</td>
      <td>887</td>
      <td>2500</td>
      <td>01/03/2022</td>
      <td>Hala Man</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>1398</td>
      <td>1200</td>
      <td>1210</td>
      <td>01/04/2022</td>
      <td>Sige Talon</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>1800</td>
      <td>998</td>
      <td>1290</td>
      <td>01/05/2022</td>
      <td>Haduken</td>
    </tr>
    <tr>
      <td>Thursday</td>
      <td>1708</td>
      <td>780</td>
      <td>1000</td>
      <td>01/06/2022</td>
      <td>Ako Lang</td>
    </tr>
    <tr>
      <td>Friday</td>
      <td>1908</td>
      <td>880</td>
      <td>1400</td>
      <td>01/07/2022</td>
      <td>Ewan Ko</td>
    </tr>
    <tr>
      <td>Saturday</td>
      <td>1908</td>
      <td>640</td>
      <td>980</td>
      <td>01/08/2022</td>
      <td>Bahag Hari</td>
    </tr>
    <tr>
      <td>Sunday</td>
      <td>980</td>
      <td>1240</td>
      <td>1330</td>
      <td>01/09/2022</td>
      <td>Hay Buhay</td>
    </tr>

  </tbody>
</Table>
</Container>
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

  const categories = (await CategoriesQueries.getAll(props.token)).data
    .categories;

  return {
    props: {
      ...props,
      categories,
    },
  };
}