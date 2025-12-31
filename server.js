import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

let isConnected = false;



const app = express();


app.use((req, res, next) => {
  if(!isConnected) {
    connectDB().then(() => {
      isConnected = true;
      next();
    }).catch((err) => {
      console.error('Failed to connect to DB', err);
      res.status(500).json({ success: false, message: 'Database connection error' });
    });
  } else {
    next();
  }
}
)


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Task Management API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      tasks: '/api/tasks',
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong!' 
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });

// do not use app.listen in vercel deployment
module.exports = app;