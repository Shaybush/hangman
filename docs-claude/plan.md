# Hangman Game Implementation Plan

## Project Overview
Build a Hangman game with single-player and two-player competitive modes using React (Vite) frontend and Node.js Express backend.

**Key Architecture Decision**: The game will be implemented as a new feature module within the existing Devora project, maintaining clear client-server separation.

---

## Phase 1: Project Setup & Backend Foundation

**Assigned to**: `senior-backend-engineer`
**Date Started**: 2025-12-26
**Status**: [ ] Not Started | [ ] In Progress | [x] Completed

### Tasks
- [x] Create word list data file (`server/src/data/wordList.ts`) with 100+ common words
- [x] Create hangman routes file (`server/src/routes/hangman.ts`)
- [x] Create hangman controller (`server/src/controllers/hangmanController.ts`)
- [x] Create hangman service (`server/src/services/hangmanService.ts`)
- [x] Implement `GET /api/hangman/word` endpoint - returns random word from list
- [x] Implement `POST /api/hangman/validate-guess` endpoint - validates letter against word
- [x] Register hangman routes in main server index
- [x] Consult devops for port configuration if needed - N/A, using existing port 5001
- [x] Update `docs-claude/backend-routes.md` with new endpoints

### API Endpoints Specification

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/hangman/word` | Get random word | - | `{ success: boolean, data: { word: string, length: number } }` |
| POST | `/api/hangman/validate-guess` | Validate a letter guess | `{ word: string, guess: string }` | `{ success: boolean, data: { isCorrect: boolean, positions: number[] } }` |

#### Phase 1 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | Word list (120 words), hangman service with getRandomWord() and validateGuess(), controller with request handlers, routes, and main server registration |
| Were there any deviations from the plan? | Response format wrapped in `{ success: boolean, data: {...} }` for consistency with API patterns |
| Issues/blockers encountered? | Minor TypeScript warning for unused `req` parameter |
| How were issues resolved? | Prefixed with underscore `_req` to indicate intentionally unused |
| Any technical debt introduced? | None |
| Recommendations for next phase? | API is ready. Frontend can start consuming endpoints immediately |

**Completed by**: `senior-backend-engineer`
**Date Completed**: 2025-12-26

#### Notes for Future Phases
- **New dependencies**: None added
- **API changes**: Two new hangman endpoints added at `/api/hangman/*`
- **Config changes**: None
- **Files created**:
  - `server/src/data/wordList.ts` - 120 words (easy/medium/hard)
  - `server/src/services/hangmanService.ts` - Game logic
  - `server/src/controllers/hangmanController.ts` - Request handlers
  - `server/src/routes/hangman.ts` - Route definitions
  - `docs-claude/backend-routes.md` - API documentation

---

## Phase 2: Frontend Core Game Components

**Assigned to**: `frontend-engineer`
**Date Started**:
**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed

### Tasks
- [ ] Create folder structure: `frontend/src/features/hangman/`
- [ ] Create game types (`frontend/src/features/hangman/types.ts`)
  - GameMode enum (SINGLE_PLAYER, TWO_PLAYER)
  - GameState interface
  - Player interface
- [ ] Create HangmanVisual component - SVG-based hangman drawing (6 stages)
- [ ] Create WordDisplay component - shows underscores and revealed letters
- [ ] Create LetterKeyboard component - clickable A-Z buttons
- [ ] Create UsedLetters component - displays guessed letters (correct/incorrect)
- [ ] Create AttemptsDisplay component - shows remaining attempts
- [ ] Create API service (`frontend/src/features/hangman/api.ts`)
- [ ] Create game state hook (`frontend/src/features/hangman/useHangmanGame.ts`)

### Component Specifications

```
HangmanVisual: SVG component, props: { wrongGuesses: number } (0-6)
WordDisplay: props: { word: string, revealedLetters: string[] }
LetterKeyboard: props: { usedLetters: string[], onGuess: (letter) => void, disabled: boolean }
UsedLetters: props: { correct: string[], incorrect: string[] }
AttemptsDisplay: props: { remaining: number, max: number }
```

#### Phase 2 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | |
| Were there any deviations from the plan? | |
| Issues/blockers encountered? | |
| How were issues resolved? | |
| Any technical debt introduced? | |
| Recommendations for next phase? | |

**Completed by**:
**Date Completed**:

#### Notes for Future Phases
- **New dependencies**: None (using existing React setup)
- **Component exports**: All components exported from `features/hangman/index.ts`

---

## Phase 3: Single Player Mode

**Assigned to**: `frontend-engineer`
**Date Started**:
**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed

### Tasks
- [ ] Create SinglePlayerGame component (`frontend/src/features/hangman/pages/SinglePlayerGame.tsx`)
- [ ] Implement game initialization (fetch word from API)
- [ ] Implement letter guessing logic with state updates
- [ ] Implement win condition detection (all letters revealed)
- [ ] Implement lose condition detection (6 wrong guesses)
- [ ] Create GameOverModal component (win/lose display)
- [ ] Add "Play Again" functionality
- [ ] Add "Return to Menu" functionality
- [ ] Style the game screen with CSS/Tailwind

### Game Logic Flow
```
1. Start -> Fetch random word from API
2. Display: underscores, keyboard, hangman (empty), attempts (6)
3. Player clicks letter:
   a. Check if letter in word
   b. If yes: reveal letter positions, mark as correct
   c. If no: increment wrong guesses, draw hangman part, mark as incorrect
4. Check win/lose conditions after each guess
5. Show result modal on game end
```

#### Phase 3 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | |
| Were there any deviations from the plan? | |
| Issues/blockers encountered? | |
| How were issues resolved? | |
| Any technical debt introduced? | |
| Recommendations for next phase? | |

**Completed by**:
**Date Completed**:

#### Notes for Future Phases
- **Reusable logic**: Game hook can be reused for two-player mode

---

## Phase 4: Main Menu & Navigation

**Assigned to**: `frontend-engineer`
**Date Started**:
**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed

### Tasks
- [ ] Create MainMenu component (`frontend/src/features/hangman/pages/MainMenu.tsx`)
  - Title: "Hangman"
  - Button: "Single Player"
  - Button: "Two Player"
- [ ] Set up React Router for hangman feature
  - `/hangman` -> MainMenu
  - `/hangman/single` -> SinglePlayerGame
  - `/hangman/two-player/setup` -> TwoPlayerSetup
  - `/hangman/two-player/game` -> TwoPlayerGame
- [ ] Update App.tsx to include hangman routes
- [ ] Create navigation helper functions
- [ ] Style main menu with consistent theme

#### Phase 4 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | |
| Were there any deviations from the plan? | |
| Issues/blockers encountered? | |
| How were issues resolved? | |
| Any technical debt introduced? | |
| Recommendations for next phase? | |

**Completed by**:
**Date Completed**:

#### Notes for Future Phases
- **New dependencies**: react-router-dom (if not already installed)
- **Route structure**: All hangman routes under `/hangman` prefix

---

## Phase 5: Two-Player Setup Screen

**Assigned to**: `frontend-engineer`
**Date Started**:
**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed

### Tasks
- [ ] Create TwoPlayerSetup component (`frontend/src/features/hangman/pages/TwoPlayerSetup.tsx`)
- [ ] Add Player 1 name input (optional, default: "Player 1")
- [ ] Add Player 2 name input (optional, default: "Player 2")
- [ ] Add "Start Game" button
- [ ] Create two-player game state context/store
- [ ] Store player names in game state
- [ ] Navigate to TwoPlayerGame on start
- [ ] Style setup screen

### State Structure
```typescript
interface TwoPlayerState {
  player1: { name: string; score: number };
  player2: { name: string; score: number };
  currentPlayer: 1 | 2;
  roundNumber: number;
}
```

#### Phase 5 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | |
| Were there any deviations from the plan? | |
| Issues/blockers encountered? | |
| How were issues resolved? | |
| Any technical debt introduced? | |
| Recommendations for next phase? | |

**Completed by**:
**Date Completed**:

#### Notes for Future Phases
- **State management**: Two-player state persisted during game session

---

## Phase 6: Two-Player Competitive Mode

**Assigned to**: `frontend-engineer`
**Date Started**:
**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed

### Tasks
- [ ] Create TwoPlayerGame component (`frontend/src/features/hangman/pages/TwoPlayerGame.tsx`)
- [ ] Display active player indicator prominently
- [ ] Create Scoreboard component (Player 1 vs Player 2 scores)
- [ ] Implement round system:
  - Fetch new word for each round
  - Current player plays until win/lose
  - Award point on win
  - Switch to other player
- [ ] Create RoundTransition component (shows result, "Next Player" button)
- [ ] Implement continuous gameplay until players choose to end
- [ ] Add "End Game" button (returns to menu, shows final scores)
- [ ] Create FinalScoreModal component
- [ ] Style two-player interface

### Game Flow
```
1. Setup -> Enter names -> Start
2. Round 1: Player 1 plays
   - Win: +1 point, show success
   - Lose: +0 points, show failure
3. Transition: "Player 2's Turn" screen
4. Round 2: Player 2 plays (same logic)
5. Alternate until "End Game" pressed
6. Final score modal with winner announcement
```

#### Phase 6 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | |
| Were there any deviations from the plan? | |
| Issues/blockers encountered? | |
| How were issues resolved? | |
| Any technical debt introduced? | |
| Recommendations for next phase? | |

**Completed by**:
**Date Completed**:

#### Notes for Future Phases
- **Feature complete**: Core game functionality done after this phase

---

## Phase 7: Polish & Integration

**Assigned to**: `frontend-engineer`, `senior-backend-engineer`
**Date Started**:
**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed

### Tasks
- [ ] Add keyboard support (physical keyboard letter input)
- [ ] Add loading states for API calls
- [ ] Add error handling for API failures
- [ ] Add responsive design for mobile
- [ ] Test single-player mode end-to-end
- [ ] Test two-player mode end-to-end
- [ ] Fix any identified bugs
- [ ] Update `docs-claude/webui-templates-index.md` with new pages
- [ ] Clean up unused code

### Testing Checklist
- [ ] Single player: Start game, win by guessing all letters
- [ ] Single player: Start game, lose by making 6 wrong guesses
- [ ] Single player: Play again after win/lose
- [ ] Single player: Return to menu
- [ ] Two player: Setup with custom names
- [ ] Two player: Setup with default names
- [ ] Two player: Complete multiple rounds
- [ ] Two player: Verify scoring works correctly
- [ ] Two player: End game and see final scores
- [ ] Keyboard input works for letter guessing
- [ ] Mobile layout is usable

#### Phase 7 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | |
| Were there any deviations from the plan? | |
| Issues/blockers encountered? | |
| How were issues resolved? | |
| Any technical debt introduced? | |
| Recommendations for next phase? | |

**Completed by**:
**Date Completed**:

---

## File Structure Summary

### Backend (server/)
```
server/src/
├── data/
│   └── wordList.ts           # Word list for hangman
├── controllers/
│   └── hangmanController.ts  # Request handlers
├── services/
│   └── hangmanService.ts     # Business logic
├── routes/
│   └── hangman.ts            # Route definitions
```

### Frontend (frontend/)
```
frontend/src/
├── features/
│   └── hangman/
│       ├── index.ts              # Feature exports
│       ├── types.ts              # TypeScript types
│       ├── api.ts                # API service
│       ├── useHangmanGame.ts     # Game logic hook
│       ├── useTwoPlayerGame.ts   # Two-player state hook
│       ├── components/
│       │   ├── HangmanVisual.tsx
│       │   ├── WordDisplay.tsx
│       │   ├── LetterKeyboard.tsx
│       │   ├── UsedLetters.tsx
│       │   ├── AttemptsDisplay.tsx
│       │   ├── Scoreboard.tsx
│       │   ├── GameOverModal.tsx
│       │   ├── RoundTransition.tsx
│       │   └── FinalScoreModal.tsx
│       └── pages/
│           ├── MainMenu.tsx
│           ├── SinglePlayerGame.tsx
│           ├── TwoPlayerSetup.tsx
│           └── TwoPlayerGame.tsx
```

---

## Dependencies

### Frontend (to be installed if not present)
- `react-router-dom` - For routing between game screens

### Backend
- No additional dependencies required

---

## Execution Order

1. **Phase 1** (Backend) - Must complete first as frontend depends on API
2. **Phase 2** (Frontend Components) - Core building blocks
3. **Phase 3** (Single Player) - First playable feature
4. **Phase 4** (Navigation) - Connect everything
5. **Phase 5** (Two-Player Setup) - Prepare for multiplayer
6. **Phase 6** (Two-Player Game) - Full multiplayer implementation
7. **Phase 7** (Polish) - Final testing and refinements

---

## Notes

- Maximum 6 wrong guesses before game over (standard hangman rules)
- Word list should contain words of varying difficulty (4-10 letters)
- All game logic runs client-side after fetching the word
- API only provides words and validates guesses (optional validation)
- Two-player mode uses local state, no persistent storage needed
