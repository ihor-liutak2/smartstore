'use client';

// src/app/login/page.jsx
// Login page with Email/Password and Google sign-in

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [mode, setMode] = useState('login'); // "login" | "register"
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    async function handleEmailAuth(e) {
        e.preventDefault();
        setError('');
        setBusy(true);
        try {
            if (mode === 'login') {
                await loginWithEmail(email, password);
            } else {
                await registerWithEmail(email, password);
            }
            router.push('/dashboard');
        } catch (err) {
            setError(err?.message || 'Auth error');
        } finally {
            setBusy(false);
        }
    }

    async function handleGoogle() {
        setError('');
        setBusy(true);
        try {
            await loginWithGoogle();
            router.push('/dashboard');
        } catch (err) {
            setError(err?.message || 'Google sign-in error');
        } finally {
            setBusy(false);
        }
    }

    return (
        <Container className="py-5" style={{ maxWidth: 520 }}>
            <Card className="shadow-sm">
                <Card.Body className="p-4">
                    <h2 className="mb-3">SmartStore</h2>
                    <p className="text-muted mb-4">
                        {mode === 'login' ? 'Sign in to continue.' : 'Create an account.'}
                    </p>

                    {error ? <Alert variant="danger">{error}</Alert> : null}

                    <Form onSubmit={handleEmailAuth}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                required
                            />
                        </Form.Group>

                        <Stack gap={2}>
                            <Button type="submit" disabled={busy}>
                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                            </Button>

                            <Button variant="outline-secondary" type="button" onClick={handleGoogle} disabled={busy}>
                                Continue with Google
                            </Button>

                            <Button
                                variant="link"
                                type="button"
                                className="px-0 text-start"
                                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                disabled={busy}
                            >
                                {mode === 'login'
                                    ? "Don't have an account? Create one"
                                    : 'Already have an account? Sign in'}
                            </Button>
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
