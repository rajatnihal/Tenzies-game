export default function Die(props) {
  return (
    <div
      aria-pressed={props.isHeld}
      aria-label={`die with value of ${props.value}, ${
        props.isHeld ? "held" : "not held"
      }`}
      onClick={() => props.fun(props.id)}
      className="random-Number-button"
    >
      <div className="dice" ref={props.diceRef}>
        <div
          className="face front"
          style={{
            background: props.isHeld
              ? "#111"
              : "linear-gradient(145deg, #dddbd8, #fff)",
            "--dot-color": props.isHeld ? "#db0" : " #f63330",
          }}
        ></div>
        <div
          className="face back"
          style={{
            background: props.isHeld
              ? "#111"
              : "linear-gradient(145deg, #dddbd8, #fff)",
            "--dot-color": props.isHeld ? "#3ef" : "#131210",
          }}
        ></div>
        <div
          className="face top"
          style={{
            background: props.isHeld
              ? "#111"
              : "linear-gradient(145deg, #dddbd8, #fff)",
            "--dot-color": props.isHeld ? "#3ef" : "#131210",
          }}
        ></div>
        <div
          className="face bottom"
          style={{
            background: props.isHeld
              ? "#111"
              : "linear-gradient(145deg, #dddbd8, #fff)",
            "--dot-color": props.isHeld ? "#3ef" : "#131210",
          }}
        ></div>
        <div
          className="face right"
          style={{
            background: props.isHeld
              ? "#111"
              : "linear-gradient(145deg, #dddbd8, #fff)",
            "--dot-color": props.isHeld ? "#3ef" : "#131210",
          }}
        ></div>
        <div
          className="face left"
          style={{
            background: props.isHeld
              ? "#111"
              : "linear-gradient(145deg, #dddbd8, #fff)",
            "--dot-color": props.isHeld ? "#3ef" : "#131210",
          }}
        ></div>
      </div>
    </div>
  );
}
