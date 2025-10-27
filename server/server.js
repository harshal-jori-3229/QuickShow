import express from 'express';
import cors from 'cors';

import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
const port = 3000;

await connectDB();

//Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())


// API Routes
app.get('/', (req, res)=> res.send('server is live'));
app.use('/api/inngest', serve({ client: inngest, functions }))

app.post('/api/test/create-user', async (req, res) => {
  try {
    const event = {
      name: 'clerk/user.created',
      data: {
        id: "test_user_" + Date.now(),
        first_name: "Test",
        last_name: "User",
        email_addresses: [{ email_address: "testuser@example.com" }],
        image_url: "https://example.com/testuser.png"
      }
    };

    // Send event to Inngest
    await inngest.send(event);

    res.status(200).json({
      success: true,
      message: "Test user creation event sent successfully!",
      event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, ()=> console.log(`Server is listening at http://localhost:${port}`));




