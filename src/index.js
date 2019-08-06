import { render } from "react-dom";
import React, { useState, useRef } from "react";
import styles from "./index.scss";
import { Button } from "./Button";
import classNames from "classnames";

export function Buttons({ renderButtons = () => <React.Fragment /> }) {
  const [isOpened, setIsOpened] = useState(false);
  const renderCount = useRef(0);
  const timer = useRef(undefined);
  const handleClickButton = () => {
    setIsOpened(true);
  };

  const handleMouseLeave = () => {
    timer.current = setTimeout(() => {
      setIsOpened(false);
    }, 1000);
  };
  const handleMouseEnter = () => {
    if (!timer.current) return;
    clearTimeout(timer.current);
  };

  renderCount.current++;
  const isInitialRender = renderCount.current === 1;
  return (
    <div
      className={styles.buttonWrapper}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className={styles.container} onClick={handleClickButton}>
        Open!
      </div>
      <div
        className={classNames(styles.wrap, {
          [styles.out]: !isOpened,
          [styles.in]: isOpened
        })}
        style={{ display: isInitialRender ? "none" : "block" }}
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

render(
  <Buttons renderButtons={renderButtons} />,
  document.getElementById("app")
);
