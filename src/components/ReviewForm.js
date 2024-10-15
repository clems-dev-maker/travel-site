// src/components/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ destinationId }) => {
    const [formData, setFormData] = useState({
        username: '',
        rating: 5,
        comment: '',
        destinationId: parseInt(destinationId)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/reviews', formData)
            .then(() => {
                console.log('Avis ajouté : ', formData);
                // Optionnel : rafraîchir la liste des avis ou utiliser un callback
                window.location.reload(); // Simple, mais peut être amélioré
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'avis :', error);
            });
    };

    return (
        <div>
            <h4>Ajouter un avis</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>
                <label>
                    Note:
                    <select name="rating" value={formData.rating} onChange={handleChange}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Commentaire:
                    <textarea name="comment" value={formData.comment} onChange={handleChange} required />
                </label>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default ReviewForm;
