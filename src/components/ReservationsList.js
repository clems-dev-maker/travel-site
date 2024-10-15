// src/components/ReservationsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';

const ReservationsList = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/reservations')
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des réservations :', error);
                setError('Impossible de charger les réservations.');
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/reservations/${id}`)
            .then(() => {
                setReservations(reservations.filter(reservation => reservation.id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la réservation :', error);
                setError('Impossible de supprimer la réservation.');
            });
    };

    return (
        <div>
            <h2 className="mb-4">Mes Réservations</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {reservations.length === 0 ? (
                <p>Aucune réservation trouvée.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Destination ID</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.destinationId}</td>
                                <td>{reservation.name}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.date}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(reservation.id)}>Supprimer</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ReservationsList;
