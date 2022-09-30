import React from "react";
import { formatDate } from "../../utils"
import { Ride } from "../../types"
import styles from "./Card.module.css";

type Props = {
  ride: Ride;
}

export const Card: React.FC<Props> = ({ ride }) => {
  const {
    id,
    type,
    date,
    distance,
    leader,
    speed,
    route
  } = ride;
  return (
    <div className={styles.container}>
      <div>{type}</div>
      <div>{formatDate(date)}</div>
      <div>{distance}</div>
      <div>{route}</div>
      <div>{leader}</div>
    </div>
  );
};
