import React, { ReactNode } from "react"
import Link from "next/link"
import Head from "next/head"
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap"
import { FaSignOutAlt, FaPlayCircle } from "react-icons/fa"
import getConfig from "next/config"
import { GetServerSideProps } from "next"
import { User } from "../../../utils/types/UserType"

const { publicRuntimeConfig } = getConfig()

type Props = {
    children?: ReactNode
    title?: string
    user?: User
}

const Layout = ({ user, children }: Props) => {
    const handleLogout = async () => {
        // Send a logout request to the server
    }
    const imagePath = `${publicRuntimeConfig.imageFolder}/logo.png`

    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="light"
                variant="light"
                className="align-items-center justify-content-center text-center"
            >
                <Navbar.Brand href="/">
                    <Image
                        src={imagePath}
                        width="80"
                        height="50"
                        className="d-inline-block align-top mr-2"
                        alt="Logo"
                    />
                    Blind Test
                </Navbar.Brand>
                <Nav.Link href="/">
                    <FaPlayCircle className="mr-2" />
                    Play
                </Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown
                            title={user?.username ? user.username : "User"}
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1">
                                Settings
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Logout
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">
                                Upgrade plan
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <FaSignOutAlt />
                        <Nav.Item>
                            <Nav.Link onClick={handleLogout} className="ml-1">
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
        </>
    )
}

export default Layout
