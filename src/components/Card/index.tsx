import React from "react";
import { Ride } from "../../types"
import styles from "./Card.module.css";

export const Card: React.FC<Ride> = ({
  id,
  type,
  date,
  distance,
  leader,
  speed,
  route
}) => {
  //TODO: switch based on type
  return (
    <div className={styles.container}>
      <div>{type}</div>
      <div>{date}</div>
      <div>{distance}</div>
      <div>{route}</div>
      <div>{leader}</div>
    </div>
  );
};
