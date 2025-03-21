import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const diceRefs = React.useRef([]);

  const [numbers, setNumbers] = React.useState(() => generateAllNewDice());

  const [rollCount, setRollCount] = React.useState(0);

  const [time, setTime] = React.useState(0);

  const [isActive, setIsActive] = React.useState(false);

  const timerRef = React.useRef(null);

  React.useEffect(() => {
    numbers.forEach((die, index) => {
      animateDiceFace(die.value, index);
    });
  }, []);

  function hold(id) {
    setNumbers((prevObj) =>
      prevObj.map((obj) =>
        obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj
      )
    );
  }

  let gameWon = numbers.every(
    (obj) => obj.isHeld === true && obj.value === numbers[0].value
  );

  React.useEffect(() => {
    if (isActive && !gameWon) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (gameWon || !isActive) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, gameWon]);

  function animateDiceFace(random, index) {
    const dice = diceRefs.current[index];
    if (!dice) return;

    dice.style.animation = "rolling 1s";

    setTimeout(() => {
      switch (random) {
        case 1:
          dice.style.transform = "rotateX(0deg) rotateY(0deg)";
          break;

        case 6:
          dice.style.transform = "rotateX(180deg) rotateY(0deg)";
          break;

        case 2:
          dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
          break;

        case 5:
          dice.style.transform = "rotateX(90deg) rotateY(0deg)";
          break;

        case 3:
          dice.style.transform = "rotateX(0deg) rotateY(90deg)";
          break;

        case 4:
          dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
          break;

        default:
          break;
      }

      dice.style.animation = "none";
    }, 1050);
  }

  function randomDice(index) {
    const random = Math.floor(Math.random() * 6) + 1;
    animateDiceFace(random, index);
    return random;
  }

  function generateAllNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * 6) + 1;
      newDice.push({
        value: random,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    if (!gameWon) {
      if (!isActive) {
        setIsActive(true);
      }
      setRollCount((prevCount) => prevCount + 1);
      setNumbers((prevObj) =>
        prevObj.map((obj, index) =>
          obj.isHeld === false ? { ...obj, value: randomDice(index) } : obj
        )
      );
    } else {
      const newDice = generateAllNewDice();
      setRollCount(0);
      setTime(0);
      setIsActive(false);
      setNumbers(newDice);
      // Trigger animations for new game
      setTimeout(() => {
        newDice.forEach((die, index) => {
          animateDiceFace(die.value, index);
        });
      }, 0);
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const diceElement = numbers.map((obj, index) => (
    <Die
      value={obj.value}
      key={obj.id}
      isHeld={obj.isHeld}
      fun={hold}
      id={obj.id}
      diceRef={(el) => (diceRefs.current[index] = el)}
    />
  ));

  const buttonRef = React.useRef(null);
  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && <Confetti />}
      <div className="sr-only" aria-live="polite">
        {gameWon && (
          <p> Congratulations! You Won in {rollCount} rolls and {formatTime(time)}! Press
            'New Game' to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      {gameWon && (
          <p className="victory-message"> Congratulations! You Won in {rollCount} rolls and {formatTime(time)}! Press
            'New Game' to start again.</p>
      )}
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="stats">
        <div className="roll-count">Rolls: {rollCount}</div>
        <div className="timer">Time: {formatTime(time)}</div>
      </div>
      <div className="dice-container">{diceElement}</div>
      <button className="roll-dice-button" onClick={rollDice} ref={buttonRef}>
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}
export default App;
