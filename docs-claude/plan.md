# Hangman Game Implementation Plan

## Project Overview
Build a Hangman game with single-player and two-player competitive modes using React (Vite) frontend and Node.js Express backend.

**Key Architecture Decision**: The game will be implemented as a new feature module within the existing Devora project, maintaining clear client-server separation.

---

## CSS Conventions (IMPORTANT - All phases must follow)

### Global CSS Variables (defined in `frontend/src/index.css`)
All colors MUST use these CSS variables - do NOT add hardcoded colors:

```css
/* Core Colors */
--color-success: #4CAF50;
--color-success-hover: #45a049;
--color-error: #f44336;
--color-error-hover: #d32f2f;
--color-primary: #2196F3;
--color-primary-hover: #1976D2;
--color-warning: #ff9800;
--color-warning-hover: #f57c00;

/* Neutral Colors */
--color-text: #333;
--color-text-light: #666;
--color-border: #333;
--color-white: #ffffff;
--color-bg-light: #e0e0e0;
--color-bg-disabled: #ccc;
--color-overlay: rgba(0, 0, 0, 0.6);

/* Special */
--color-gallows: #8B4513;
```

### Global Button Classes (defined in `frontend/src/index.css`)
Use these instead of creating new button styles:
- `.btn` - Base button (padding, font, border-radius)
- `.btn-success` - Green button
- `.btn-error` - Red button
- `.btn-primary` - Blue button

### Styling Rules
1. **Use CSS Modules** - Every component gets a `.module.css` file
2. **No inline styles** - All styles go in CSS modules
3. **Use CSS variables** - Reference colors with `var(--color-xxx)`
4. **If new color needed** - Add to `:root` in index.css first
5. **Dynamic classes** - Use conditional classNames for state-based styling:
   ```tsx
   className={`${styles.button} ${isActive ? styles.active : ''}`}
   ```
6. **Global buttons** - Use `.btn` classes for buttons, not module-specific styles

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
**Date Started**: 2025-12-26
**Status**: [ ] Not Started | [ ] In Progress | [x] Completed

### Tasks
- [x] Create folder structure: `frontend/src/features/hangman/`
- [x] Create game types (`frontend/src/features/hangman/types.ts`)
  - GameMode enum (SINGLE_PLAYER, TWO_PLAYER)
  - GameState interface
  - Player interface
- [x] Create HangmanVisual component - SVG-based hangman drawing (6 stages)
- [x] Create WordDisplay component - shows underscores and revealed letters
- [x] Create LetterKeyboard component - clickable A-Z buttons
- [x] Create UsedLetters component - displays guessed letters (correct/incorrect)
- [x] Create AttemptsDisplay component - shows remaining attempts
- [x] Create API service (`frontend/src/features/hangman/api.ts`)
- [x] Create game state hook (`frontend/src/features/hangman/useHangmanGame.ts`)

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
| What was implemented? | All core game components: HangmanVisual (SVG), WordDisplay, LetterKeyboard, UsedLetters, AttemptsDisplay, API service, useHangmanGame hook, types, and a demo HangmanGame page |
| Were there any deviations from the plan? | Added a bonus HangmanGame.tsx demo page for testing components together; added components/index.ts barrel export |
| Issues/blockers encountered? | None |
| How were issues resolved? | N/A |
| Any technical debt introduced? | None - all components are properly typed and reusable |
| Recommendations for next phase? | Components are ready for integration. Phase 3 can directly use HangmanGame page or build SinglePlayerGame from scratch using the components |

**Completed by**: `frontend-engineer`
**Date Completed**: 2025-12-26

#### Notes for Future Phases
- **New dependencies**: None (using existing React setup)
- **Component exports**: All components exported from `features/hangman/index.ts`
- **CSS Modules**: All components refactored to use CSS Modules (see CSS Conventions section above)
- **Files created**:
  - `frontend/src/features/hangman/types.ts` - TypeScript interfaces
  - `frontend/src/features/hangman/api.ts` - API service
  - `frontend/src/features/hangman/useHangmanGame.ts` - Game logic hook
  - `frontend/src/features/hangman/index.ts` - Main exports
  - `frontend/src/features/hangman/components/HangmanVisual.tsx` + `.module.css`
  - `frontend/src/features/hangman/components/WordDisplay.tsx` + `.module.css`
  - `frontend/src/features/hangman/components/LetterKeyboard.tsx` + `.module.css`
  - `frontend/src/features/hangman/components/UsedLetters.tsx` + `.module.css`
  - `frontend/src/features/hangman/components/AttemptsDisplay.tsx` + `.module.css`
  - `frontend/src/features/hangman/components/index.ts`
  - `frontend/src/features/hangman/pages/HangmanGame.tsx` + `.module.css` - Demo page
  - `frontend/src/features/hangman/README.md` - Documentation
- **Styling**: All colors use CSS variables from `frontend/src/index.css` - see CSS Conventions section

---

## Phase 3: Single Player Mode

**Assigned to**: `frontend-engineer`
**Date Started**: 2025-12-26
**Status**: [ ] Not Started | [ ] In Progress | [x] Completed

### Tasks
- [x] Create SinglePlayerGame component (`frontend/src/features/hangman/pages/SinglePlayerGame.tsx`)
- [x] Implement game initialization (fetch word from API)
- [x] Implement letter guessing logic with state updates
- [x] Implement win condition detection (all letters revealed)
- [x] Implement lose condition detection (6 wrong guesses)
- [x] Create GameOverModal component (win/lose display)
- [x] Add "Play Again" functionality
- [x] Add "Return to Menu" functionality
- [x] Style the game screen with CSS Modules

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
| What was implemented? | SinglePlayerGame page, GameOverModal component, global CSS variables and button utilities in index.css |
| Were there any deviations from the plan? | Used CSS Modules instead of inline styles; Added global CSS variables for colors and reusable button classes |
| Issues/blockers encountered? | Initial implementation used inline styles which was corrected to CSS modules; Colors were hardcoded, moved to global CSS vars |
| How were issues resolved? | Created .module.css files for each component; Added CSS variables (--color-success, --color-error, --color-primary, etc.) and .btn utility classes to index.css |
| Any technical debt introduced? | None - code follows best practices with CSS modules and global variables |
| Recommendations for next phase? | Global button classes (.btn, .btn-success, .btn-primary) are ready for reuse in MainMenu and other pages |

**Completed by**: `frontend-engineer`
**Date Completed**: 2025-12-26

#### Notes for Future Phases
- **Reusable logic**: Game hook can be reused for two-player mode
- **Global CSS variables added to index.css**:
  - `--color-success` (#4CAF50), `--color-success-hover` (#45a049)
  - `--color-error` (#f44336), `--color-error-hover` (#d32f2f)
  - `--color-primary` (#2196F3), `--color-primary-hover` (#1976D2)
  - `--color-text` (#333), `--color-text-light` (#666)
  - `--color-overlay` (rgba(0, 0, 0, 0.6))
- **Global button classes**: `.btn`, `.btn-success`, `.btn-error`, `.btn-primary`
- **Files created**:
  - `frontend/src/features/hangman/components/GameOverModal.tsx`
  - `frontend/src/features/hangman/components/GameOverModal.module.css`
  - `frontend/src/features/hangman/pages/SinglePlayerGame.tsx`
  - `frontend/src/features/hangman/pages/SinglePlayerGame.module.css`
- **Files modified**:
  - `frontend/src/index.css` - Added global CSS vars and button utilities
  - `frontend/src/features/hangman/components/index.ts` - Export GameOverModal
  - `frontend/src/features/hangman/index.ts` - Export SinglePlayerGame

---

## Phase 4: Main Menu & Navigation (React Router v7 Data Mode)

**Assigned to**: `frontend-engineer`
**Date Started**: 2025-12-26
**Status**: [ ] Not Started | [ ] In Progress | [x] Completed

### React Router v7 Setup (Data Mode)

Use **Data Mode** with `createBrowserRouter` - recommended for existing Vite/React projects.

**Reference**: [React Router Modes](https://reactrouter.com/start/modes) | [SPA Guide](https://reactrouter.com/how-to/spa)

### Tasks
- [x] Install React Router v7: `pnpm add react-router`
- [x] Create router configuration (`frontend/src/router.tsx`)
  ```tsx
  import { createBrowserRouter } from "react-router";

  export const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        {
          path: "hangman",
          children: [
            { index: true, Component: MainMenu },
            { path: "single", Component: SinglePlayerGame },
            {
              path: "two-player",
              children: [
                { path: "setup", Component: TwoPlayerSetup },
                { path: "game", Component: TwoPlayerGame },
              ]
            },
          ],
        },
      ],
    },
  ]);
  ```
- [x] Create RootLayout component with `<Outlet />` for nested routes
- [x] Update `main.tsx` to use `RouterProvider`:
  ```tsx
  import { RouterProvider } from "react-router";
  import { router } from "./router";

  ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />
  );
  ```
- [x] Create MainMenu component (`frontend/src/features/hangman/pages/MainMenu.tsx`)
  - Title: "Hangman"
  - Button: "Single Player" -> navigates to `/hangman/single`
  - Button: "Two Player" -> navigates to `/hangman/two-player/setup`
  - Use `useNavigate()` hook or `<Link>` component for navigation
- [x] Update SinglePlayerGame to use `useNavigate()` for "Return to Menu"
- [x] Style MainMenu with CSS Modules (use global button classes)
- [x] Create simple Home component or redirect `/` to `/hangman`

### Route Structure

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home/Redirect | Landing or redirect to hangman |
| `/hangman` | MainMenu | Game mode selection |
| `/hangman/single` | SinglePlayerGame | Single player gameplay |
| `/hangman/two-player/setup` | TwoPlayerSetup | Enter player names |
| `/hangman/two-player/game` | TwoPlayerGame | Two player gameplay |

### Navigation Patterns (React Router v7)

```tsx
// Using Link component (preferred for simple navigation)
import { Link } from "react-router";
<Link to="/hangman/single">Single Player</Link>

// Using useNavigate hook (for programmatic navigation)
import { useNavigate } from "react-router";
const navigate = useNavigate();
navigate("/hangman");

// Using loader for data fetching (optional for this phase)
export async function loader() {
  return { /* data */ };
}
```

#### Phase 4 Completion Report
| Question | Response |
|----------|----------|
| What was implemented? | React Router v7 with Data Mode (createBrowserRouter), RootLayout with Outlet, MainMenu with Link navigation, updated SinglePlayerGame with useNavigate |
| Were there any deviations from the plan? | Root path `/` renders MainMenu directly instead of separate Home component (simpler approach) |
| Issues/blockers encountered? | MainMenu CSS initially had hardcoded gradient color |
| How were issues resolved? | Added `--gradient-menu` CSS variable to index.css and updated MainMenu.module.css to use it |
| Any technical debt introduced? | Placeholder components for TwoPlayerSetup and TwoPlayerGame in router.tsx (expected - will be replaced in Phase 5-6) |
| Recommendations for next phase? | Two-player routes are set up with placeholders, ready to be replaced with actual components |

**Completed by**: `frontend-engineer`
**Date Completed**: 2025-12-26

#### Notes for Future Phases
- **New dependencies**: `react-router` (v7.11.0)
- **Route structure**: All hangman routes nested under `/hangman`
- **Navigation**: Use `<Link>` for declarative, `useNavigate()` for programmatic
- **Loaders**: Can add `loader` functions later for data prefetching
- **Files created**:
  - `frontend/src/router.tsx` - Router configuration with placeholder components
  - `frontend/src/layouts/RootLayout.tsx` - Root layout with Outlet
  - `frontend/src/features/hangman/pages/MainMenu.tsx` - Main menu component
  - `frontend/src/features/hangman/pages/MainMenu.module.css` - Main menu styles
- **Files modified**:
  - `frontend/src/main.tsx` - Now uses RouterProvider
  - `frontend/src/features/hangman/pages/SinglePlayerGame.tsx` - Added useNavigate for Return to Menu
  - `frontend/src/features/hangman/index.ts` - Exports MainMenu
  - `frontend/src/index.css` - Added `--gradient-menu` CSS variable

---

## Phase 5: Two-Player Setup Screen

**Assigned to**: `frontend-engineer`
**Date Started**: 2025-12-26
**Status**: [ ] Not Started | [ ] In Progress | [x] Completed

### Tasks
- [x] Create TwoPlayerSetup component (`frontend/src/features/hangman/pages/TwoPlayerSetup.tsx`)
- [x] Add Player 1 name input (optional, default: "Player 1")
- [x] Add Player 2 name input (optional, default: "Player 2")
- [x] Add "Start Game" button
- [x] Create two-player game state context/store
- [x] Store player names in game state
- [x] Navigate to TwoPlayerGame on start
- [x] Style setup screen

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
| What was implemented? | TwoPlayerContext (React Context with Provider), TwoPlayerSetup component with player name inputs, TwoPlayerState type, CSS Module styling |
| Were there any deviations from the plan? | Added 20-character limit on player name inputs for UX; Context wrapped in RootLayout for global access |
| Issues/blockers encountered? | None |
| How were issues resolved? | N/A |
| Any technical debt introduced? | None - all code is properly typed and follows project conventions |
| Recommendations for next phase? | TwoPlayerContext is ready. Phase 6 should use `useTwoPlayerContext()` to access player state, scores, and round management functions |

**Completed by**: `frontend-engineer`
**Date Completed**: 2025-12-26

#### Notes for Future Phases
- **State management**: Two-player state persisted during game session via React Context
- **Context functions available**:
  - `setPlayerNames(name1, name2)` - Set player names (called in setup)
  - `incrementScore(playerNum)` - Award point to player 1 or 2
  - `switchPlayer()` - Toggle current player (1 ↔ 2)
  - `incrementRound()` - Increment round counter
  - `resetGame()` - Reset all state to initial values
- **Files created**:
  - `frontend/src/features/hangman/TwoPlayerContext.tsx` - Context and Provider
  - `frontend/src/features/hangman/pages/TwoPlayerSetup.tsx` - Setup page
  - `frontend/src/features/hangman/pages/TwoPlayerSetup.module.css` - Styles
- **Files modified**:
  - `frontend/src/features/hangman/types.ts` - Added TwoPlayerState interface
  - `frontend/src/router.tsx` - Replaced placeholder with real component
  - `frontend/src/layouts/RootLayout.tsx` - Wrapped with TwoPlayerProvider
  - `frontend/src/features/hangman/index.ts` - Added new exports

---

## Phase 6: Two-Player Competitive Mode

**Assigned to**: `frontend-engineer`
**Date Started**: 2025-12-26
**Status**: [ ] Not Started | [ ] In Progress | [x] Completed

### Tasks
- [x] Create TwoPlayerGame component (`frontend/src/features/hangman/pages/TwoPlayerGame.tsx`)
- [x] Display active player indicator prominently
- [x] Create Scoreboard component (Player 1 vs Player 2 scores)
- [x] Implement round system:
  - Fetch new word for each round
  - Current player plays until win/lose
  - Award point on win
  - Switch to other player
- [x] Create RoundTransition component (shows result, "Next Player" button)
- [x] Implement continuous gameplay until players choose to end
- [x] Add "End Game" button (returns to menu, shows final scores)
- [x] Create FinalScoreModal component
- [x] Style two-player interface

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
| What was implemented? | TwoPlayerGame main page, Scoreboard component (shows both players' scores with active player highlighting), RoundTransition modal (shows round result and next player), FinalScoreModal (winner announcement with trophy emoji), CSS Modules for all components |
| Were there any deviations from the plan? | Added "Now Playing" banner for extra visibility of current player; used gamePhase state machine ('playing', 'transition', 'ended') for cleaner flow control |
| Issues/blockers encountered? | None |
| How were issues resolved? | N/A |
| Any technical debt introduced? | None - all components properly typed and follow project CSS conventions |
| Recommendations for next phase? | Add keyboard support for letter input, test on mobile devices for responsive design |

**Completed by**: `frontend-engineer`
**Date Completed**: 2025-12-26

#### Notes for Future Phases
- **Feature complete**: Core game functionality done after this phase
- **Files created**:
  - `frontend/src/features/hangman/pages/TwoPlayerGame.tsx` - Main two-player game page
  - `frontend/src/features/hangman/pages/TwoPlayerGame.module.css` - Two-player page styles
  - `frontend/src/features/hangman/components/Scoreboard.tsx` - Scoreboard component
  - `frontend/src/features/hangman/components/Scoreboard.module.css` - Scoreboard styles
  - `frontend/src/features/hangman/components/RoundTransition.tsx` - Round transition modal
  - `frontend/src/features/hangman/components/RoundTransition.module.css` - RoundTransition styles
  - `frontend/src/features/hangman/components/FinalScoreModal.tsx` - Final score modal
  - `frontend/src/features/hangman/components/FinalScoreModal.module.css` - FinalScoreModal styles
- **Files modified**:
  - `frontend/src/router.tsx` - Replaced placeholder with real TwoPlayerGame component
  - `frontend/src/features/hangman/components/index.ts` - Added exports for Scoreboard, RoundTransition, FinalScoreModal
  - `frontend/src/features/hangman/index.ts` - Added exports for new components and TwoPlayerGame page
- **Game state flow**:
  - Uses `useHangmanGame` hook for core hangman logic (word, guesses, win/lose)
  - Uses `useTwoPlayerContext` for player names, scores, current player, round number
  - `gamePhase` state controls which modal is shown ('playing' | 'transition' | 'ended')
  - Round ends → show RoundTransition → Continue → switch player, new word → playing
  - End Game button → show FinalScoreModal → Play Again (setup) or Main Menu

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
