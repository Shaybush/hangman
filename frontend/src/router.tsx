import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { MainMenu } from "./features/hangman/pages/MainMenu";
import { SinglePlayerGame } from "./features/hangman/pages/SinglePlayerGame";
import { TwoPlayerSetup } from "./features/hangman/pages/TwoPlayerSetup";
import { TwoPlayerGame } from "./features/hangman/pages/TwoPlayerGame";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: MainMenu }, // Root redirects to hangman menu
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
            ],
          },
        ],
      },
    ],
  },
]);
