import { Outlet } from "react-router";
import { TwoPlayerProvider } from "../features/hangman/TwoPlayerContext";

export function RootLayout() {
  return (
    <TwoPlayerProvider>
      <div className="app-container">
        <Outlet />
      </div>
    </TwoPlayerProvider>
  );
}
