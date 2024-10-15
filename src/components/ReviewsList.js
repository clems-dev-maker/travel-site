// src/components/ReviewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    return (
        <div>
            {reviews.length === 0 ? (
                <p>Aucun avis pour le moment.</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <strong>{review.username}</strong> - Note : {review.rating}/5
                            <p>{review.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewsList;
