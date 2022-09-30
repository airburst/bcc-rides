import React from "react";
import { Group } from "../../types";
import { Card } from "../../components";
import { ungroupRides } from "../../utils"
import styles from "./RideGroup.module.css";

type Props = {
  group: Group;
}

export const RideGroup: React.FC<Props> = ({ group }) => {
  const rideData = ungroupRides(group);
  const date = rideData.map(({ date }) => date)[0];
  const types = rideData.map(({ type, rides }) => ({ type, rides }));
  console.log("🚀 ~ file: index.tsx ~ line 15 ~ types", types)

  return (
    <>
      <div className={styles.container}>
        <div>{date}</div>
      </div>
      {types.map(({ type, rides }) => (
        <div key={type}>{type}</div>
        // {
        //   rides.map((ride: Ride) => (
        //     <Card key={ride.id} ride={ride} />
        //   ))
        // }
      ))}
    </>
  );
};
