// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Arrêter le chargement après la réponse de Firebase
        });
        return () => unsubscribe();
    }, []);

    return { user, loading }; // Retourner aussi l'état de chargement
};
