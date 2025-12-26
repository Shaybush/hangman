import { Request, Response } from 'express';
import logger from '../utils/logger';
import hangmanService from '../services/hangmanService';

/**
 * Get a random word for hangman game
 * GET /api/hangman/word
 */
export const getWord = (_req: Request, res: Response): void => {
  try {
    const word = hangmanService.getRandomWord();

    logger.info('Hangman word generated', {
      meta: {
        wordLength: word.length,
        timestamp: new Date().toISOString()
      }
    });

    res.status(200).json({
      success: true,
      data: {
        word,
        length: word.length
      }
    });
  } catch (error) {
    logger.error('Error generating hangman word', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    res.status(500).json({
      success: false,
      error: 'Failed to generate word'
    });
  }
};

/**
 * Validate a letter guess
 * POST /api/hangman/validate-guess
 */
export const validateGuess = (req: Request, res: Response): void => {
  try {
    const { word, guess } = req.body;

    // Validate input
    if (!word || typeof word !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Word is required and must be a string'
      });
      return;
    }

    if (!guess || typeof guess !== 'string' || guess.length !== 1) {
      res.status(400).json({
        success: false,
        error: 'Guess is required and must be a single character'
      });
      return;
    }

    // Validate that guess is a letter
    if (!/^[a-zA-Z]$/.test(guess)) {
      res.status(400).json({
        success: false,
        error: 'Guess must be a letter (a-z)'
      });
      return;
    }

    const result = hangmanService.validateGuess(word, guess);

    logger.info('Hangman guess validated', {
      meta: {
        guess,
        isCorrect: result.isCorrect,
        positionsFound: result.positions.length,
        timestamp: new Date().toISOString()
      }
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Error validating hangman guess', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    res.status(500).json({
      success: false,
      error: 'Failed to validate guess'
    });
  }
};
