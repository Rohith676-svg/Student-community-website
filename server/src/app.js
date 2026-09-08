import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import { admin } from './config/firebase.js';

import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root status route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Tech Community (STC) Backend API is operational',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      events: '/api/events'
    }
  });
});

// Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);

// 404 and Error Handling
app.use(notFound);
app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

export default app; // Export for testing
