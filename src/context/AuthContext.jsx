import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Mock authentication functions for demo
    const signIn = async (email, password) => {
        console.log('Mock sign in:', email, password);
        setUser({ email, id: 'mock-user-id' });
        setProfile({ full_name: 'Demo User', email });
    };

    const signUp = async (email, password, fullName) => {
        console.log('Mock sign up:', email, password, fullName);
        setUser({ email, id: 'mock-user-id' });
        setProfile({ full_name: fullName, email });
    };

    const signOut = async () => {
        console.log('Mock sign out');
        setUser(null);
        setProfile(null);
    };

    const value = {
        user,
        profile,
        signIn,
        signUp,
        signOut,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};