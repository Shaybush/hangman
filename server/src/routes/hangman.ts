import { Router } from 'express';
import { getWord, validateGuess } from '../controllers/hangmanController';

const router: Router = Router();

// GET /api/hangman/word - Get a random word for the game
router.get('/word', getWord);

// POST /api/hangman/validate-guess - Validate a letter guess
router.post('/validate-guess', validateGuess);

export default router;
