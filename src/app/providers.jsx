'use client';

// src/app/providers.jsx
// App-level providers

import { AuthProvider } from '@/context/AuthContext';

export default function Providers({ children }) {
    return <AuthProvider>{children}</AuthProvider>;
}
