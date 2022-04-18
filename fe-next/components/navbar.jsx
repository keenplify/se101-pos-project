import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Card,
  Badge,
} from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../styles/navbar.module.css";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { AiFillProfile } from "react-icons/ai";
import { BACKEND } from "../helpers";
import { useCookies } from "react-cookie";

export function NavBar({ employee }) {
  const [, , removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const logout = () => {
    removeCookie("token");
    router.push("/login");
  };

  return (
    <Navbar collapseOnSelect sticky="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Image
            src="/img/Logo.jpg"
            alt="me"
            width="35"
            height="30"
            className="rounded p-0 "
          />
        </Navbar.Brand>
        <Navbar.Brand className={styles.NavBrand} href="#home">
          Vaperous M4ster
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className={styles.NavLink} activeKey={router.asPath}>
            <Nav.Link href="/" className="fw-bold">
              HOME
            </Nav.Link>
            <Nav.Link href="/inventory" className="fw-bold">
              INVENTORY
            </Nav.Link>
            <Nav.Link href="/sales" className="fw-bold">
              SALES
            </Nav.Link>
            <Nav.Link href="/employee" className="fw-bold">
              EMPLOYEE
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>


        <Navbar.Collapse className="justify-content-end">
          
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              disabled={!employee}
              class={styles.NavDropdown}
              title={ 
                <span className={styles.dropdownTitle}> <FaUserCircle className="fs-2 me-1"></FaUserCircle>
                  {employee ? (
                    <span className={styles.employeeText}>
                      {employee.firstName} {employee.lastName}
                    </span>
                  ) : (
                    <span>Not signed in</span>
                  )}
                </span>
              }
              menuVariant="dark"
            >
          
              {employee && ( 
                <NavDropdown.Item
                  href="profile"
                  className={styles.employeeContainer}
                >
                  <div className={styles.employeeAvatar}>
                    <Image  
                      src={`${BACKEND}${employee.images[0].location}`}
                      layout="responsive"
                      width="1"
                      height="1"
                     
                    />
                  </div>
                  <div className={styles.employeeDetails}>
                    <span>
                      {employee.firstName} {employee.lastName}
                    </span>
                    <span className={styles.badges}>
                      <Badge bg="secondary">#{employee.id}</Badge>
                      <Badge bg="primary">{employee.type}</Badge>
                    </span>
                  </div>
                </NavDropdown.Item>
              )}
              <NavDropdown.Item href="#action/3.2">
                <AiOutlineSetting className="fs-3 p-1"></AiOutlineSetting>
                Setting
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                <AiFillProfile className="fs-3 p-1"></AiFillProfile>Activity
                Logs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                <FiLogOut className="fs-3 p-1"></FiLogOut>Log Out
              </NavDropdown.Item>
              
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
