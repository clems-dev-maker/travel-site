// src/components/Destinations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Pagination } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [destinationsPerPage] = useState(6);
    const [totalDestinations, setTotalDestinations] = useState(0);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/destinations?_page=${currentPage}&_limit=${destinationsPerPage}`);
                setDestinations(response.data);
                const total = response.headers['x-total-count'];
                setTotalDestinations(parseInt(total));
            } catch (error) {
                console.error('Erreur lors de la récupération des destinations :', error);
            }
        };

        fetchDestinations();
    }, [currentPage, destinationsPerPage]);

    const totalPages = Math.ceil(totalDestinations / destinationsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <h2 style={{ color: "#008DDA" }} className="mb-4">Nos Destinations Populaires</h2>
            <Row>
                {destinations.map(destination => (
                    <Col key={destination.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card> {/* Ajout de la classe pour le survol */}
                            <LazyLoadImage
                                src={destination.image}
                                alt={destination.name}
                                effect="blur"
                                width="100%"
                                height="200px"
                                style={{ objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title style={{ color: "#008DDA" }}>{destination.name}</Card.Title>
                                <Card.Text>À partir de {destination.price}</Card.Text>
                                <Button variant="primary" as={Link} to={`/destinations/${destination.id}`}>
                                    Voir Détails
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default Destinations;
