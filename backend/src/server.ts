import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { db } from './prisma/db';
import { authenticate } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/auth/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Validate inputs
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  // Check if email already exists
  const existing = await db.orm.public.User.where({ email }).first();
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);
  // Create user
  const user = await db.orm.public.User.create({ name, email, passwordHash });
  const { id, role, avatar, createdAt, updatedAt } = user;
  return res.status(201).json({ id, name, email, role, avatar, createdAt, updatedAt });
});

// Login endpoint
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = await db.orm.public.User.where({ email }).first();
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const { id, name, role, avatar, createdAt, updatedAt } = user;
  const token = jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return res.json({ token, id, name, email, role, avatar, createdAt, updatedAt });
});

// Get current authenticated user
app.get('/api/auth/me', authenticate, async (req: Request, res: Response) => {
  // @ts-ignore - user added by middleware
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
  const user = await db.orm.public.User.where({ id: userId }).first();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { id, name, email, role, avatar, createdAt, updatedAt } = user;
  return res.json({ id, name, email, role, avatar, createdAt, updatedAt });
});

export default app;

// Start the server (dev entrypoint is `tsx watch src/server.ts`).
app.listen(PORT, () => {
  console.log(`NexaUI backend listening on http://localhost:${PORT}`);
});
