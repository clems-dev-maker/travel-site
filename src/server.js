require('dotenv').config(); // Charger les variables d'environnement depuis .env

const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Utiliser la clé Stripe depuis les variables d'environnement

app.use(bodyParser.json());
app.use(cors());

// Route pour créer un PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodId, amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
        });

        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(5001, () => {
    console.log('Serveur démarré sur le port 5001');
});
