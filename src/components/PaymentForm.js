import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Form, Button } from 'react-bootstrap';

const PaymentForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return; // Assurez-vous que Stripe.js a bien été chargé
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setCardError(error.message);
            console.error('Erreur de paiement:', error);
        } else {
            console.log('PaymentMethod créé:', paymentMethod);
            try {
                const response = await fetch('http://localhost:5001/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethodId: paymentMethod.id,
                        amount: price * 100,
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    console.log('Paiement réussi !');
                } else {
                    console.error('Erreur de paiement:', data.error);
                }
            } catch (error) {
                console.error('Erreur lors de la soumission du paiement:', error);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCardNumber" className="mb-3">
                <Form.Label>Détails de la carte</Form.Label>
                <CardElement />
                {cardError && <div className="text-danger mt-2">{cardError}</div>}
            </Form.Group>
            <Button variant="success" type="submit" disabled={!stripe}>
                Payer maintenant
            </Button>
        </Form>
    );
};

export default PaymentForm;
