import { useEffect } from 'react';
import { useHangmanGame } from '../useHangmanGame';
import { HangmanVisual } from '../components/HangmanVisual';
import { WordDisplay } from '../components/WordDisplay';
import { LetterKeyboard } from '../components/LetterKeyboard';
import { UsedLetters } from '../components/UsedLetters';
import { AttemptsDisplay } from '../components/AttemptsDisplay';
import styles from './HangmanGame.module.css';

export function HangmanGame() {
  const {
    gameState,
    isLoading,
    error,
    startGame,
    makeGuess,
    resetGame,
    getCorrectLetters,
    getIncorrectLetters
  } = useHangmanGame();

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleNewGame = () => {
    resetGame();
    startGame();
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button 
          onClick={handleNewGame}
          className="btn btn-primary"
          style={{ marginTop: '20px' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const isGameOver = gameState.gameStatus !== 'playing';
  const remainingAttempts = gameState.maxAttempts - gameState.wrongGuesses;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hangman Game
      </h1>

      <HangmanVisual wrongGuesses={gameState.wrongGuesses} />

      {gameState.word && (
        <>
          <WordDisplay 
            word={gameState.word} 
            revealedLetters={gameState.revealedLetters} 
          />

          <AttemptsDisplay 
            remaining={remainingAttempts} 
            max={gameState.maxAttempts} 
          />

          <UsedLetters 
            correct={getCorrectLetters()} 
            incorrect={getIncorrectLetters()} 
          />

          <LetterKeyboard
            usedLetters={gameState.usedLetters}
            correctLetters={gameState.revealedLetters}
            onGuess={makeGuess}
            disabled={isGameOver}
          />

          {isGameOver && (
            <div className={styles.gameOverContainer}>
              <h2 className={`${styles.gameOverTitle} ${gameState.gameStatus === 'won' ? styles.titleWon : styles.titleLost}`}>
                {gameState.gameStatus === 'won' ? 'You Won!' : 'Game Over!'}
              </h2>
              <p className={styles.wordReveal}>
                The word was: <strong>{gameState.word}</strong>
              </p>
              <button
                onClick={handleNewGame}
                className="btn btn-primary"
              >
                New Game
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
