'use client';

// src/context/AuthContext.jsx
// Provides Firebase Auth user and auth actions to the app

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser ?? null);
            setAuthLoading(false);
        });

        return () => unsub();
    }, []);

    const actions = useMemo(() => {
        return {
            async loginWithEmail(email, password) {
                return signInWithEmailAndPassword(auth, email, password);
            },
            async registerWithEmail(email, password) {
                return createUserWithEmailAndPassword(auth, email, password);
            },
            async loginWithGoogle() {
                const provider = new GoogleAuthProvider();
                return signInWithPopup(auth, provider);
            },
            async logout() {
                return signOut(auth);
            },
        };
    }, []);

    const value = useMemo(() => ({ user, authLoading, ...actions }), [user, authLoading, actions]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within <AuthProvider>.');
    }
    return ctx;
}
