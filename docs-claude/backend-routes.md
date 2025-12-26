# Backend Routes

## Health
- `GET /api/health` - Health check endpoint

## Hangman Game
- `GET /api/hangman/word` - Get random word for game
  - Response: `{ success: true, data: { word: string, length: number } }`
- `POST /api/hangman/validate-guess` - Validate letter guess
  - Body: `{ word: string, guess: string }`
  - Response: `{ success: true, data: { isCorrect: boolean, positions: number[] } }`
