'use client';

// src/app/dashboard/page.jsx
// Example protected page (redirects to /login if not authenticated)

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
    const router = useRouter();
    const { user, authLoading, logout } = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/login');
        }
    }, [authLoading, user, router]);

    if (authLoading || (!user && typeof window !== 'undefined')) {
        return (
            <Container className="py-5">
                <Spinner animation="border" role="status" />
            </Container>
        );
    }

    if (!user) return null;

    return (
        <Container className="py-5">
            <h1 className="mb-3">Dashboard</h1>
            <p className="text-muted">Signed in as: {user.email}</p>

            <Button
                variant="outline-danger"
                onClick={async () => {
                    await logout();
                    router.push('/login');
                }}
            >
                Sign out
            </Button>
        </Container>
    );
}
