import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import env from "dotenv";


import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from './routes/notes.js';

env.config();
const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL
];

app.use(cors({ origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

