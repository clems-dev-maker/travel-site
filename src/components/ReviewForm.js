// src/components/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import des icônes Bootstrap

const ReviewForm = ({ destinationId }) => {
    const [formData, setFormData] = useState({
        username: '',
        rating: 5,
        comment: '',
        destinationId: parseInt(destinationId)
    });

    const [alert, setAlert] = useState(null);  // Ajout d'un état pour les alertes de succès/erreur

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/reviews', formData)
            .then(() => {
                setAlert({ type: 'success', message: 'Avis ajouté avec succès !' });
                setTimeout(() => window.location.reload(), 2000);  // Recharge la page après 2 secondes
            })
            .catch(error => {
                setAlert({ type: 'danger', message: 'Erreur lors de l\'ajout de l\'avis. Veuillez réessayer.' });
                console.error('Erreur lors de l\'ajout de l\'avis :', error);
            });
    };

    return (
        <div className="review-form mt-4">
            <h4 style={{color: "#008DDA"}}>Ajouter un avis</h4>

            {/* Affichage de l'alerte si elle existe */}
            {alert && (
                <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                    {alert.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formUsername" className="mb-3">
                    <Form.Label column sm={2}>Nom:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Entrez votre nom"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRating" className="mb-3">
                    <Form.Label column sm={2}>Note:</Form.Label>
                    <Col sm={10} className="d-flex align-items-center">
                        <Form.Control
                            as="select"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            style={{ maxWidth: '80px', marginRight: '10px' }}  // Largeur réduite pour le sélecteur
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </Form.Control>
                        {/* Icône d'étoile */}
                        <i className="bi bi-star-fill" style={{ fontSize: '1.5rem', color: '#f39c12' }}></i>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formComment" className="mb-3">
                    <Form.Label column sm={2}>Commentaire:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="Ajoutez un commentaire"
                            required
                        />
                    </Col>
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit">Ajouter</Button>
                </div>
            </Form>
        </div>
    );
};

export default ReviewForm;
