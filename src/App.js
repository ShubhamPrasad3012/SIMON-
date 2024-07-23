import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

// App Imports...
import Heading from "./components/Heading";
import wrong from "./sounds/wrong.mp3";
import StartButton from "./components/StartButton";
import GameInfo from "./components/GameInfoBox";
import BoxContainer from "./components/BoxContainer";
import InfoIcon from "./components/InfoIcon";

function App() {
  const ref = useRef(null);
  const [gamePattern, setGamePattern] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const [level, setLevel] = useState(0);
  const [heading, setHeading] = useState(null);
  const [randomChosenColour, setRandomChosenColour] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [buttonPositions, setButtonPositions] = useState(["red", "blue", "green", "yellow"]);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [highScoreMessage, setHighScoreMessage] = useState("");
  const [gameMessage, setGameMessage] = useState(""); 
  const buttonColours = ["red", "blue", "green", "yellow"];
  const wrongSound = new Audio(wrong);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
  }, []);

  useEffect(() => {
    if (isStarted) {
      setHeading("Starting...");
      nextSequence();
    }
  }, [isStarted]);

  useEffect(() => {
    if (userClickedPattern.length !== 0) {
      checkAnswer(userClickedPattern.length - 1);
    }
  }, [userClickedPattern]);

  useEffect(() => {
    if (randomChosenColour) {
      setGamePattern((prevPattern) => [...prevPattern, randomChosenColour]);
      setRandomChosenColour(null);
    }
  }, [randomChosenColour]);

  useEffect(() => {
    if (timeLeft === 0 && isStarted) {
      endGame("Time's up! Game Over!");
    }
  }, [timeLeft]);

  const handleInfoClick = () => {
    ref.current.click();
  };

  const userClick = (color) => {
    setUserClickedPattern((prevPattern) => [...prevPattern, color]);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const nextSequence = () => {
    setGameMessage("Memorise"); 
    setHeading(null);
    setLevel((prevLevel) => prevLevel + 1);
    setUserClickedPattern([]);
    const randomColor = buttonColours[Math.floor(Math.random() * 4)];
    setRandomChosenColour(randomColor);
    setButtonPositions(shuffleArray([...buttonColours]));
    startTimer();
    setTimeout(() => {
      setGameMessage("Your Turn"); 
    }, 1000); 
  };

  const checkAnswer = (i) => {
    const timeoutValues = {
      easy: 200,
      medium: 100,
      hard: 50,
    };

    const timeout = timeoutValues[difficulty] || 200;

    if (userClickedPattern[i] !== gamePattern[i]) {
      endGame("Wrong Move , Start Again"); 
    } else if (i + 1 === gamePattern.length) {
      clearInterval(timerInterval);
      setTimeout(() => {
        nextSequence();
      }, timeout);
    }
  };

  const startTimer = () => {
    clearInterval(timerInterval);
    const timeValues = {
      easy: 30,
      medium: 20,
      hard: 10,
    };
    const time = timeValues[difficulty] || 30;
    setTimeLeft(time);
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const endGame = (message) => {
    clearInterval(timerInterval);
    setWrongAnswer(true);
    setIsStarted(false);
    setGameMessage(message); 
    wrongSound.play();
    if (level > highScore) {
      setHighScore(level);
      localStorage.setItem("highScore", level);
      setHighScoreMessage("New High Score!");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setHighScoreMessage("");
      }, 10000); 
    }
    setTimeout(() => {
      setWrongAnswer(false);
    }, 200);
    setGamePattern([]);
    setLevel(0);
    setUserClickedPattern([]);
  };

  const startGame = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
    setIsStarted(true);
  };

  return (
    <>
      <div className="bg-black">
        <GameInfo reference={ref} showInfo={showInfo} setShowInfo={setShowInfo} />
        <div className={`w-full h-[100vh] ${wrongAnswer ? "bg-[#ff0000] opacity-80" : "bg-[violet]"} text-center ${showInfo && "blur-sm"}`}>
          {!showInfo && !isStarted && <InfoIcon handleInfoClick={handleInfoClick} />}
          
          <div>
          <p className="pt-8 text-3xl font-bold">SIMON GAME</p>
            {!isStarted ? (
              <div className="">
                
                <h1 className="pt-8">Choose Difficulty</h1>
                <button className="border border-black rounded-full p-2 m-2 mt-[2.5vh]" onClick={() => startGame("easy")}>Easy</button>
                <button className="border border-black rounded-full p-2 m-2 ml-[5vw]" onClick={() => startGame("medium")}>Medium</button>
                <button className="border border-black rounded-full p-2 m-2 ml-[5vw]" onClick={() => startGame("hard")}>Hard</button>
              </div>
            ) : (
              <div className="flex mt-[5vh]">
                <h1 className="ml-[32vw] text-lg">Score : {level}</h1>
                <h2 className="ml-[12.5vw]">High Score : {highScore}</h2>
              </div>
            )}
            
            {isStarted && <h2 className="mt-[2.5vh] font-semibold text-xl">Time Left: {timeLeft}</h2>}
          </div>
          <h2 className="mt-[2.5vh] text-lg ">{gameMessage}</h2> 
          <BoxContainer randomChosenColour={randomChosenColour} userClick={userClick} buttonPositions={buttonPositions} />
          <StartButton nextSequence={nextSequence} isStarted={isStarted} setIsStarted={setIsStarted} />
        </div>
        {showConfetti && (
          <>
            <Confetti />
            
          </>
        )}
      </div>
    </>
  );
}

export default App;
