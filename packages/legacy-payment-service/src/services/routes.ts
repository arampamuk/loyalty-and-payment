import express from 'express';
import chargePaymentRouter from './charge-payment-router';

const router = express();

// api routes api (/api/charge-payment)
router.use('/charge-payment', chargePaymentRouter);

export default router;
