import React from "react";
import { Card } from "../../components";
import { ungroupRides } from "../../utils"
import { Ride, Group } from "../../types"
import styles from "./RideGroup.module.css";

type Props = {
  group: Group;
}

export const RideGroup: React.FC<Props> = ({ group }) => {
  const rideData = ungroupRides(group);
  const date = rideData.map(({ date }) => date)[0];
  const types = rideData.map(({ type, rides }) => ({ type, rides }));

  return (
    <>
      <div className={styles.container}>
        <div>{date}</div>
      </div>
      {types.map(({ type, rides }) => (
        <Card key={type} rides={rides} />
      ))}
    </>
  );
};
