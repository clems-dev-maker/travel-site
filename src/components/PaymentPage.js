// src/components/PaymentPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import PaymentForm from './PaymentForm'; // Assurez-vous que le composant PaymentForm est bien importé

const PaymentPage = () => {
    const { id, price } = useParams(); // Récupérer les paramètres de réservation (ID et prix)

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Paiement de la réservation</Card.Title>
                    <Card.Text className="text-center">
                        <strong>Réservation ID:</strong> {id}
                    </Card.Text>
                    <Card.Text className="text-center">
                        <strong>Total à payer:</strong> {price}
                    </Card.Text>

                    <div className="mt-4">
                        <PaymentForm price={price} />
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default PaymentPage;
