// src/components/ReviewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import des icônes Bootstrap

const ReviewsList = ({ destinationId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/reviews?destinationId=${destinationId}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des avis :', error);
            });
    }, [destinationId]);

    // Fonction pour générer les étoiles
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'} text-warning`}  // Étoile pleine ou vide
                    style={{ fontSize: '1.2rem' }}
                ></i>
            );
        }
        return stars;
    };

    return (
        <div className="reviews-list mt-4">
            {reviews.length === 0 ? (
                <p >Aucun avis pour le moment.</p>
            ) : (
                <ListGroup >
                    {reviews.map(review => (
                        <ListGroup.Item key={review.id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={8}>
                                            <Card.Title>
                                                <strong>{review.username}</strong>
                                            </Card.Title>
                                            <Card.Text>
                                                {review.comment}
                                            </Card.Text>
                                        </Col>
                                        <Col md={4} className="text-md-right">
                                            {/* Affichage des étoiles */}
                                            <div className="stars">
                                                {renderStars(review.rating)}
                                            </div>
                                            <p className="mt-2">Note : {review.rating}/5</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default ReviewsList;
