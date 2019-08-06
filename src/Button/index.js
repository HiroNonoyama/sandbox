import React from "react";
import styles from "./index.scss";

export function Button({ title }) {
  return <div className={styles.container}>{title}</div>;
}
