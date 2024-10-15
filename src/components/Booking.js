// src/components/Booking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        destinationId: null
    });
    const [destinationPrice, setDestinationPrice] = useState(0); // Ajout du prix de la destination
    const { id } = useParams(); // ID de la destination
    const navigate = useNavigate();

    useEffect(() => {
        // Mettre à jour le formulaire avec l'ID de la destination
        setFormData(prevData => ({ ...prevData, destinationId: id }));
        // Simuler une requête pour récupérer le prix de la destination (ce prix devrait idéalement provenir de l'API)
        axios.get(`http://localhost:5000/destinations/${id}`)
            .then(response => {
                setDestinationPrice(response.data.price); // Supposons que le prix soit renvoyé ici
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du prix:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/reservations', formData)
            .then(response => {
                console.log('Réservation envoyée : ', formData);
                // Rediriger vers la page de paiement avec l'ID de la réservation et le prix
                const reservationId = response.data.id; // Supposons que l'ID de la réservation soit renvoyé par l'API
                navigate(`/reservations/${reservationId}/payment/${destinationPrice}`);
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi de la réservation :', error);
            });
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Réserver votre voyage</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formDate" className="mb-3">
                        <Form.Label>Date de départ</Form.Label>
                        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">Réserver</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Booking;
