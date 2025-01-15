import express from 'express';
import { z } from 'zod';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const maxResults = z.string().optional().parse(req.query.maxResults) ?? '1';
    const query = z.string().parse(req.query.q);
    const API_KEY = z.string().parse(process.env.API_KEY);
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${query}&key=${API_KEY}`,
    );
    const json = await response.json();
    res.json({
      data: json,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
