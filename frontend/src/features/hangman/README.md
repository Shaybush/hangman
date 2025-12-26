# Hangman Game - Frontend Core Components

## Phase 2: Complete Implementation

This directory contains all the core game components for the Hangman game feature.

## Structure

```
hangman/
├── components/
│   ├── AttemptsDisplay.tsx    # Shows remaining attempts with progress bar
│   ├── HangmanVisual.tsx      # SVG hangman drawing (0-6 wrong guesses)
│   ├── LetterKeyboard.tsx     # A-Z clickable keyboard
│   ├── UsedLetters.tsx        # Display correct/incorrect guesses
│   └── WordDisplay.tsx        # Shows word with revealed letters
├── pages/
│   └── HangmanGame.tsx        # Complete game page (demo)
├── api.ts                     # API service for backend calls
├── types.ts                   # TypeScript interfaces
├── useHangmanGame.ts          # Custom hook with game logic
└── index.ts                   # Barrel exports
```

## Components

### HangmanVisual
Draws the hangman progressively based on wrong guesses (0-6).

```tsx
import { HangmanVisual } from './components/HangmanVisual';

<HangmanVisual wrongGuesses={3} />
```

### WordDisplay
Shows the word with underscores for unrevealed letters.

```tsx
import { WordDisplay } from './components/WordDisplay';

<WordDisplay 
  word="HANGMAN" 
  revealedLetters={['h', 'a', 'n']} 
/>
// Displays: H A N _ _ A N
```

### LetterKeyboard
Interactive A-Z keyboard with visual feedback.

```tsx
import { LetterKeyboard } from './components/LetterKeyboard';

<LetterKeyboard
  usedLetters={['a', 'e', 'i']}
  correctLetters={['a', 'e']}
  onGuess={(letter) => console.log(letter)}
  disabled={false}
/>
```

### UsedLetters
Displays correct (green) and incorrect (red) guesses.

```tsx
import { UsedLetters } from './components/UsedLetters';

<UsedLetters 
  correct={['a', 'e', 'h']} 
  incorrect={['x', 'z']} 
/>
```

### AttemptsDisplay
Shows remaining attempts with a color-coded progress bar.

```tsx
import { AttemptsDisplay } from './components/AttemptsDisplay';

<AttemptsDisplay remaining={4} max={6} />
```

## Custom Hook

### useHangmanGame
Complete game logic hook that manages state and API calls.

```tsx
import { useHangmanGame } from './useHangmanGame';

const {
  gameState,           // Current game state
  isLoading,          // Loading state
  error,              // Error message
  startGame,          // Start new game (fetches word)
  makeGuess,          // Make a letter guess
  resetGame,          // Reset game state
  getCorrectLetters,  // Get correct guesses
  getIncorrectLetters // Get incorrect guesses
} = useHangmanGame();
```

## API Service

### getRandomWord()
Fetches a random word from the backend.

```typescript
const { word, length } = await getRandomWord();
```

### validateGuess(word, guess)
Validates a letter guess against the word.

```typescript
const { isCorrect, positions } = await validateGuess('HANGMAN', 'a');
```

## Complete Example

See `/pages/HangmanGame.tsx` for a complete working example that uses all components together.

## Usage in App

```tsx
import { HangmanGame } from '@/features/hangman/pages/HangmanGame';

function App() {
  return <HangmanGame />;
}
```

## Styling

All components use inline styles for simplicity. Colors used:
- Green (#4CAF50): Correct guesses
- Red (#f44336): Incorrect guesses
- Gray (#ccc): Disabled/used letters
- Blue (#2196F3): Action buttons
- Brown (#8B4513): Gallows

## TypeScript Types

All components are fully typed. Import types from:

```typescript
import { GameMode, GameState, Player } from './types';
```

## Backend Integration

The components integrate with these backend endpoints:
- `GET /api/hangman/word` - Get random word
- `POST /api/hangman/validate-guess` - Validate letter guess

Backend should be running on `http://localhost:5001`
