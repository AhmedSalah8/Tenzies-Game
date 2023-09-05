import "./App.css";
import React from "react";
import Die from "./components/die";
import { v4 as uuidv4 } from "uuid";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [everyHeld, setEveryHeld] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstNumber = dice[0].value;
    const allNumbersSame = dice.every((die) => die.value === firstNumber);
    if (allHeld && allNumbersSame) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
    setEveryHeld(allHeld);
  }, [dice]);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    // Update the window width whenever the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function generateNewDice() {
    return {
      id: uuidv4(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDice());
    }
    return arr;
  }

  function toggle(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function generateDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDice();
      })
    );
  }
  function resetGame() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return generateNewDice();
      })
    );
  }
  const theDice = dice.map((die) => (
    <Die
      key={die.id}
      number={die.value}
      isHeld={die.isHeld}
      toggle={() => toggle(die.id)}
      tenzies={tenzies}
      everyHeld={everyHeld}
    />
  ));
  return (
    <main className="main-contianer">
      <h1 className="title">Tenzies</h1>

      {tenzies ? (
        <p className="green-text">Congratulations You WON THE GAME!</p>
      ) : tenzies === false && everyHeld ? (
        <p className="red-text">
          All the Numbers are NOT THE SAME!, please try again
        </p>
      ) : (
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      )}

      <div className="tenzies-container">
        <div className="dice">{theDice}</div>
        {tenzies === false && everyHeld ? (
          <button
            id="btn"
            className="roll-dice"
            onClick={tenzies ? resetGame : generateDice}
          >
            Roll
          </button>
        ) : (
          <button
            id="btn"
            className="roll-dice"
            onClick={tenzies ? resetGame : generateDice}
          >
            {tenzies ? "New Game" : "Roll"}
          </button>
        )}

        {tenzies && <Confetti width={windowWidth} height={900} />}
      </div>
    </main>
  );
}

export default App;
