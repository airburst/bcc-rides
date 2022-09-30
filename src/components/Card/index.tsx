import React from "react";
import { Ride } from "../../types";
import { Badge } from "../Badge";
import styles from "./Card.module.css";

type Props = {
  rides: Ride[];
}
/**
 * All ride instances share common date and type
 */
export const Card: React.FC<Props> = ({ rides }) => {
  const { title } = rides[0];
  const badges = rides.map(({ id, rideGroup }) => ({ id, rideGroup }));

  badges.sort((a, b) => (a.rideGroup > b.rideGroup) ? 1 : -1)

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.badges}>
        {badges.map(badge => (
          <Badge key={badge.id} text={badge.rideGroup} />
        ))}
      </div>
    </div>
  );
};
