'use client';

// src/components/AppNavbar.jsx
// Top navigation bar for SmartStore (React-Bootstrap)

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '@/context/AuthContext';

export default function AppNavbar() {
    const router = useRouter();
    const { user, authLoading, logout } = useAuth();

    return (
        <Navbar expand="lg" bg="light" variant="light" className="border-bottom">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    SmartStore
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="smartstore-navbar" />
                <Navbar.Collapse id="smartstore-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} href="/products">
                            Products
                        </Nav.Link>
                        <Nav.Link as={Link} href="/cart">
                            Cart
                        </Nav.Link>
                    </Nav>

                    <Nav className="ms-auto align-items-lg-center">
                        {authLoading ? (
                            <span className="text-muted">Loading...</span>
                        ) : user ? (
                            <>
                                <span className="text-muted me-3 small">{user.email}</span>
                                <Button
                                    variant="outline-danger"
                                    onClick={async () => {
                                        await logout();
                                        router.push('/login');
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={() => router.push('/login')}>
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
