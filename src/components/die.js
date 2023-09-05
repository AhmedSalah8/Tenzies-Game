import React from "react";

function Die(props) {
  let bg =
    props.tenzies === true && props.everyHeld
      ? "#59E391"
      : props.tenzies === false && props.everyHeld
      ? "red"
      : props.isHeld
      ? "#59E391"
      : "white";

  console.log(props.tenzies);
  return (
    <div
      className="numbers"
      style={{ backgroundColor: bg }}
      onClick={props.toggle}
    >
      <h1>{props.number}</h1>
    </div>
  );
}
export default Die;
