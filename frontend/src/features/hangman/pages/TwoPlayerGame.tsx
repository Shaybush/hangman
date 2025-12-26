import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useHangmanGame } from '../useHangmanGame';
import { useTwoPlayerContext } from '../TwoPlayerContext';
import { HangmanVisual } from '../components/HangmanVisual';
import { WordDisplay } from '../components/WordDisplay';
import { LetterKeyboard } from '../components/LetterKeyboard';
import { UsedLetters } from '../components/UsedLetters';
import { AttemptsDisplay } from '../components/AttemptsDisplay';
import { Scoreboard } from '../components/Scoreboard';
import { RoundTransition } from '../components/RoundTransition';
import { FinalScoreModal } from '../components/FinalScoreModal';
import styles from './TwoPlayerGame.module.css';

type GamePhase = 'playing' | 'transition' | 'ended';

export function TwoPlayerGame() {
  const navigate = useNavigate();
  const {
    state: twoPlayerState,
    incrementScore,
    switchPlayer,
    incrementRound,
    resetGame: resetTwoPlayerGame
  } = useTwoPlayerContext();

  const {
    gameState,
    isLoading,
    error,
    startGame,
    makeGuess,
    resetGame: resetHangmanGame,
    getCorrectLetters,
    getIncorrectLetters
  } = useHangmanGame();

  const [gamePhase, setGamePhase] = useState<GamePhase>('playing');
  const [previousResult, setPreviousResult] = useState<{
    won: boolean;
    playerName: string;
    word: string;
  } | null>(null);

  // Start game on mount
  useEffect(() => {
    startGame();
  }, [startGame]);

  // Handle round end (win or lose)
  useEffect(() => {
    if (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
      const currentPlayerName = twoPlayerState.currentPlayer === 1
        ? twoPlayerState.player1.name
        : twoPlayerState.player2.name;

      // Award point if won
      if (gameState.gameStatus === 'won') {
        incrementScore(twoPlayerState.currentPlayer);
      }

      // Store result for transition screen
      setPreviousResult({
        won: gameState.gameStatus === 'won',
        playerName: currentPlayerName,
        word: gameState.word
      });

      // Show transition
      setGamePhase('transition');
    }
  }, [gameState.gameStatus, gameState.word, twoPlayerState.currentPlayer, twoPlayerState.player1.name, twoPlayerState.player2.name, incrementScore]);

  const handleContinue = () => {
    // Switch to next player
    switchPlayer();
    incrementRound();

    // Reset hangman game and start new round
    resetHangmanGame();
    startGame();

    // Return to playing phase
    setGamePhase('playing');
    setPreviousResult(null);
  };

  const handleEndGame = () => {
    setGamePhase('ended');
  };

  const handlePlayAgain = () => {
    resetTwoPlayerGame();
    navigate('/hangman/two-player/setup');
  };

  const handleMainMenu = () => {
    resetTwoPlayerGame();
    navigate('/hangman');
  };

  const getCurrentPlayerName = () => {
    return twoPlayerState.currentPlayer === 1
      ? twoPlayerState.player1.name
      : twoPlayerState.player2.name;
  };

  const getNextPlayerName = () => {
    return twoPlayerState.currentPlayer === 1
      ? twoPlayerState.player2.name
      : twoPlayerState.player1.name;
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
          onClick={() => {
            resetHangmanGame();
            startGame();
          }}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isRoundOver = gameState.gameStatus !== 'playing';
  const remainingAttempts = gameState.maxAttempts - gameState.wrongGuesses;

  return (
    <div className={styles.container}>
      <Scoreboard
        player1Name={twoPlayerState.player1.name}
        player1Score={twoPlayerState.player1.score}
        player2Name={twoPlayerState.player2.name}
        player2Score={twoPlayerState.player2.score}
        currentPlayer={twoPlayerState.currentPlayer}
        roundNumber={twoPlayerState.roundNumber}
      />

      <div className={styles.currentPlayerBanner}>
        <span className={styles.currentPlayerLabel}>Now Playing:</span>
        <span className={styles.currentPlayerName}>{getCurrentPlayerName()}</span>
      </div>

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
            disabled={isRoundOver}
          />
        </>
      )}

      <div className={styles.endGameContainer}>
        <button
          className="btn btn-error"
          onClick={handleEndGame}
        >
          End Game
        </button>
      </div>

      {/* Round Transition Modal */}
      {previousResult && (
        <RoundTransition
          isOpen={gamePhase === 'transition'}
          previousPlayerWon={previousResult.won}
          previousPlayerName={previousResult.playerName}
          nextPlayerName={getNextPlayerName()}
          word={previousResult.word}
          onContinue={handleContinue}
        />
      )}

      {/* Final Score Modal */}
      <FinalScoreModal
        isOpen={gamePhase === 'ended'}
        player1Name={twoPlayerState.player1.name}
        player1Score={twoPlayerState.player1.score}
        player2Name={twoPlayerState.player2.name}
        player2Score={twoPlayerState.player2.score}
        onPlayAgain={handlePlayAgain}
        onMainMenu={handleMainMenu}
      />
    </div>
  );
}
