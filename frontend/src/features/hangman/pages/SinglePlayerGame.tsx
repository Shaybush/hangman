import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useHangmanGame } from '../useHangmanGame';
import { HangmanVisual } from '../components/HangmanVisual';
import { WordDisplay } from '../components/WordDisplay';
import { LetterKeyboard } from '../components/LetterKeyboard';
import { UsedLetters } from '../components/UsedLetters';
import { AttemptsDisplay } from '../components/AttemptsDisplay';
import { GameOverModal } from '../components/GameOverModal';
import styles from './SinglePlayerGame.module.css';

export function SinglePlayerGame() {
  const navigate = useNavigate();
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

  const handlePlayAgain = () => {
    resetGame();
    startGame();
  };

  const handleReturnToMenu = () => {
    navigate("/hangman");
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
        <p className={styles.errorMessage}>{error}</p>
        <button 
          onClick={handlePlayAgain}
          className="btn btn-primary"
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
        Single Player
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
        </>
      )}

      <GameOverModal
        isOpen={isGameOver}
        isWin={gameState.gameStatus === 'won'}
        word={gameState.word}
        onPlayAgain={handlePlayAgain}
        onReturnToMenu={handleReturnToMenu}
      />
    </div>
  );
}
