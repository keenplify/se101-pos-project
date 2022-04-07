import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import { useRouter } from 'next/router'
import styles from "../styles/navbar.module.css" 
import Image from 'next/image'
import {FiLogOut} from "react-icons/fi"
import {FaUserCircle} from "react-icons/fa"
import {AiOutlineSetting} from "react-icons/ai"
import {AiFillProfile} from "react-icons/ai"



export function NavBar(){
   const router = useRouter()
    return <Navbar collapseOnSelect  sticky="top" bg="dark" variant="dark" expand="lg">
    <Container>
    <Navbar.Brand href="#home">
      <Image src="/img/Logo.jpg" alt="me" width="35" height="30" className="rounded p-0 "/>
    </Navbar.Brand>
    <Navbar.Brand className={styles.NavBrand} href="#home">Vaperous M4ster</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className={styles.NavLink} activeKey={router.asPath}>
          <Nav.Link href="/" className="fw-bold">HOME</Nav.Link>
          <Nav.Link href="/inventory" className="fw-bold">INVENTORY</Nav.Link>
          <Nav.Link href="#link" className="fw-bold">SALES</Nav.Link>    
          <Nav.Link href="#link" className="fw-bold">EMPLOYEE</Nav.Link>    
        </Nav>
        </Navbar.Collapse>
       
    
    <Navbar.Collapse className="justify-content-end">
      <Nav>
        <NavDropdown
          id="nav-dropdown-dark-example"
          title={<span>
          <FaUserCircle className="fs-3"></FaUserCircle> Admin
          </span>}
          menuVariant="dark"
        >
          <NavDropdown.Item href="#action/3.1"><FaUserCircle className="fs-3 p-1"></FaUserCircle>Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2"><AiOutlineSetting className="fs-3 p-1"></AiOutlineSetting>Setting</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3"><AiFillProfile className="fs-3 p-1"></AiFillProfile>Activity Logs</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4"><FiLogOut className="fs-3 p-1"></FiLogOut>Log Out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>


 
       
    </Container>
  </Navbar>
   
}