import "./flippable-card.css";
import Card from "./Login";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

function FlippableCard() {
  const [showFront, setShowFront] = useState(true);
  return (
    <div className="App1">
      <div className="flippable-card-container">
        <CSSTransition in={showFront} timeout={300} classNames="flip">
          <Card
            onClick={() => {
              setShowFront((v) => !v);
            }}
          />
        </CSSTransition>
      </div>
    </div>
  );
}

export default FlippableCard;
