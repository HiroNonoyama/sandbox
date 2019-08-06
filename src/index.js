import { render } from "react-dom";
import React, { useState, useRef } from "react";
import styles from "./index.scss";
import { Button } from "./Button";
import classNames from "classnames";

export function Buttons({ renderInitialButton, renderButtons }) {
  const [isOpened, setIsOpened] = useState(false);
  const renderCount = useRef(0);

  const timer = useRef(undefined);
  const handleClickButton = () => {
    setIsOpened(true);
  };

  const handleMouseLeave = () => {
    timer.current = setTimeout(() => {
      setIsOpened(false);
    }, 800);
  };
  const handleMouseEnter = () => {
    if (!timer.current) return;
    clearTimeout(timer.current);
  };

  renderCount.current++;
  const isInitialRender = renderCount.current === 1;

  return (
    <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
      <div onClick={handleClickButton}>{renderInitialButton()}</div>
      <div
        className={classNames({
          [styles.out]: !isOpened,
          [styles.in]: isOpened
        })}
        style={isInitialRender ? { display: "none" } : {}}
      >
        {renderButtons()}
      </div>
    </div>
  );
}

const renderButtons = () => {
  return (
    <React.Fragment>
      <Button title="test1" />
      <Button title="test2" />
      <Button title="test3" />
    </React.Fragment>
  );
};

const renderInitialButton = () => {
  return <Button title="Open" />;
};

render(
  <Buttons
    renderInitialButton={renderInitialButton}
    renderButtons={renderButtons}
  />,
  document.getElementById("app")
);
