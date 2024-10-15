import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import PaymentPage from './components/PaymentPage';

// Ajouter ces imports pour Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51M1ndoBlNcXWBs9scd5IZ0FAWbuXCVH3OKKsWzGBHJKmYKVg5Ula5XnAJTvrX3M77vxLzGnPyBBwCjfYURHSAc8400x2BPB7gs');

// Importation des composants avec React.lazy
const Home = React.lazy(() => import('./components/Home'));
const Destinations = React.lazy(() => import('./components/Destinations'));
const DestinationDetail = React.lazy(() => import('./components/DestinationDetail'));
const Booking = React.lazy(() => import('./components/Booking'));
const Contact = React.lazy(() => import('./components/Contact'));
const Signup = React.lazy(() => import('./components/Signup'));
const Login = React.lazy(() => import('./components/Login'));
const ReservationsList = React.lazy(() => import('./components/ReservationsList'));
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute'));

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Déconnexion réussie
            })
            .catch((error) => {
                console.error('Erreur de déconnexion :', error);
            });
    };

    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">TravelSite</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/destinations">Destinations</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            {!user ? (
                                <>
                                    <Nav.Link as={Link} to="/signup">Inscription</Nav.Link>
                                    <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/reservations">Mes Réservations</Nav.Link>
                                    <Button variant="outline-light" onClick={handleLogout}>Déconnexion</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Suspense fallback={<div>Chargement...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/destinations/:id" element={<DestinationDetail />} />
                        
                        {/* Envelopper la route PaymentPage avec Elements */}
                        <Route 
                            path="/reservations/:id/payment/:price" 
                            element={
                                <PrivateRoute>
                                    <Elements stripe={stripePromise}>
                                        <PaymentPage />
                                    </Elements>
                                </PrivateRoute>
                            } 
                        />

                        <Route path="/booking/:id" element={<PrivateRoute><Booking /></PrivateRoute>} />
                        <Route path="/reservations" element={<PrivateRoute><ReservationsList /></PrivateRoute>} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Suspense>
            </Container>
        </Router>
    );
};

export default App;
