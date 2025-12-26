import { wordList } from '../data/wordList';

export interface ValidateGuessResult {
  isCorrect: boolean;
  positions: number[];
}

/**
 * Hangman game service
 * Handles game logic for word selection and guess validation
 */
class HangmanService {
  /**
   * Returns a random word from the word list
   * @returns A random word string
   */
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  }

  /**
   * Validates a letter guess against the target word
   * @param word - The target word to check against
   * @param guess - The letter being guessed (single character)
   * @returns Object containing isCorrect boolean and positions array
   */
  validateGuess(word: string, guess: string): ValidateGuessResult {
    const normalizedWord = word.toLowerCase();
    const normalizedGuess = guess.toLowerCase();

    const positions: number[] = [];

    // Find all positions where the guess matches
    for (let i = 0; i < normalizedWord.length; i++) {
      if (normalizedWord[i] === normalizedGuess) {
        positions.push(i);
      }
    }

    return {
      isCorrect: positions.length > 0,
      positions
    };
  }
}

export const hangmanService = new HangmanService();
export default hangmanService;
