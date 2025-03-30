// frontend/pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import api from '@/utils/axios'; // Import the configured axios instance

// const API_URL = 'http://localhost:5000/api/products';
const API_URL = `/api/products`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await api.get(API_URL);
      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ message: error.message });
    }
  }
}