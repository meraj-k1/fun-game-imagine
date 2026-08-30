import { useState } from "react";

import CinematicIntro from "./components/CinematicIntro";
import HeartPuzzle from "./components/HeartPuzzle";
import MemoryGame from "./components/MemoryGame";
import LoveQuiz from "./components/LoveQuiz";
import MemoryGallery from "./components/MemoryGallery";
import InteractiveLoveLetter from "./components/InteractiveLoveLetter";
import PasswordPuzzle from "./components/PasswordPuzzle";
import FinalProposal from "./components/FinalProposal";

function App() {
  const [currentStage, setCurrentStage] = useState("intro");

  const startJourney = () => {
    setCurrentStage("heart-puzzle");
  };

  const completeHeartPuzzle = () => {
    setCurrentStage("memory-game");
  };

  const completeMemoryGame = () => {
    setCurrentStage("love-quiz");
  };

  const completeLoveQuiz = () => {
    setCurrentStage("gallery");
  };

  const completeGallery = () => {
    setCurrentStage("love-letter");
  };

  const completeLoveLetter = () => {
    setCurrentStage("password");
  };

  const completePassword = () => {
    setCurrentStage("proposal");
  };

  return (
    <main className="app">
      {currentStage === "intro" && (
        <CinematicIntro onStart={startJourney} />
      )}

      {currentStage === "heart-puzzle" && (
        <HeartPuzzle onComplete={completeHeartPuzzle} />
      )}

      {currentStage === "memory-game" && (
        <MemoryGame onComplete={completeMemoryGame} />
      )}

      {currentStage === "love-quiz" && (
        <LoveQuiz onComplete={completeLoveQuiz} />
      )}

      {currentStage === "gallery" && (
        <MemoryGallery onComplete={completeGallery} />
      )}

      {currentStage === "love-letter" && (
        <InteractiveLoveLetter onComplete={completeLoveLetter} />
      )}

      {currentStage === "password" && (
        <PasswordPuzzle onComplete={completePassword} />
      )}

      {currentStage === "proposal" && <FinalProposal />}
    </main>
  );
}

export default App;