import React, { ReactNode } from "react"
import Link from "next/link"
import Head from "next/head"
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap"
import { FaSignOutAlt, FaPlayCircle } from "react-icons/fa"
import getConfig from "next/config"
import { GetServerSideProps } from "next"
import { User } from "../../../utils/types/UserType"
import { useRouter } from "next/router"

const { publicRuntimeConfig } = getConfig()

type Props = {
    children?: ReactNode
    title?: string
    user?: User
}

const Layout = ({ user, children }: Props) => {
    const router = useRouter()

    const handleLogout = async () => {
        console.log("hi")

        await fetch("/api/v1/auth/logout", {
            method: "POST",
        })
        router.push("/")

        // If you need to destroy the session on the client-side or navigate to another page, do it here.
        // For example, using Router.push("/") to navigate to the home page.
    }

    const imagePath = `${publicRuntimeConfig.imageFolder}/logo.png`
    console.log("homeuser", user)
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
                    {user?.userName ? (
                        <Nav className="me-auto">
                            <NavDropdown
                                title={user.userName}
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">
                                    Upgrade plan
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="auth/login" className="ml-1">
                                    Login
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    )}
                    {user && (
                        <Nav>
                            <FaSignOutAlt />
                            <Nav.Item>
                                <Nav.Link
                                    onClick={handleLogout}
                                    className="ml-1"
                                >
                                    Logout
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
            {children}
        </>
    )
}

export default Layout
