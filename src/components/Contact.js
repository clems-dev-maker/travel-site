// src/components/Contact.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Message envoyé : ', formData);
        // Tu peux envoyer ce message à une API ou un service de messagerie
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title style={{color: "#008DDA"}}>Contactez-nous</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formMessage" className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Envoyer</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Contact;
