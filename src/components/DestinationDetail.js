// src/components/DestinationDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const DestinationDetail = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/destinations/${id}`)
            .then(response => {
                setDestination(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de la destination :', error);
            });
    }, [id]);

    if (!destination) {
        return <p>Chargement...</p>;
    }

    const shareUrl = window.location.href;
    const title = `Découvrez ${destination.name} avec TravelSite!`;

    return (
        <div>
            <Card className="mb-4">
                <Row noGutters>
                    <Col md={6}>
                        <Card.Img src={destination.image} alt={destination.name} />
                    </Col>
                    <Col md={6}>
                        <Card.Body>
                            <Card.Title style={{color: "#008DDA"}}>{destination.name}</Card.Title>
                            <Card.Text>{destination.description}</Card.Text>
                            <Card.Text><strong style={{color: "#008DDA"}}>Prix:</strong> {destination.price}</Card.Text>
                            <Button variant="success" as={Link} to={`/booking/${destination.id}`} className="me-2">Réserver maintenant</Button>
                            {/* Boutons de partage */}
                            <div className="mt-3">
                                <span className="me-2">Partager:</span>
                                <FacebookShareButton url={shareUrl} quote={title}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl} title={title} className="ms-2">
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <WhatsappShareButton className="ms-2"  url={shareUrl} title={title} separator=":: ">
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <h3 style={{color: "#008DDA"}}>Avis</h3>
            <ReviewsList destinationId={id} />
            <ReviewForm destinationId={id} />
        </div>
    );
};

export default DestinationDetail;
