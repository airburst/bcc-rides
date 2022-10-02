import { useState } from "react";
import { useLongPress } from 'use-long-press';
import { JoinButton, GoingButton } from "../../components";
import { Ride } from "../../types";
import { isMobile } from "../../utils";
import styles from "./Card.module.css";

type Props = {
  ride: Ride;
  onPress: (ride: Ride) => void;
}

/**
 * All ride instances share common date and type
 */
export const Card: React.FC<Props> = ({ ride, onPress }) => {
  const { title, rideGroup, riderCount, destination, distance, going } = ride;
  // const isGoing = going === "1";
  const details = destination ? `${destination} - ${distance} km` : `${distance} km`;

  const [joining, setJoining] = useState<boolean>(false);
  const [isGoing, setIsGoing] = useState<boolean>(going === "1");

  const pressHandler = useLongPress(() => onPress(ride), {
    threshold: isMobile() ? 400 : 0,
    cancelOnMovement: true,
  });

  const fakeJoinHandler = (e: Event) => {
    console.log("🚀 ~ file: index.tsx ~ line 38 ~ fakeJoinHandler ~ e", e)
    e.preventDefault();
    e.stopPropagation();
    setJoining(true);
    setTimeout(() => {
      setIsGoing(true);
      setJoining(false);
    }, 600);
  };

  return (
    <div className={styles.container} >
      {/* <div className={styles.container} {...pressHandler()}> */}
      <div className={styles.col}>
        <div className={styles.title}>{title} ({rideGroup})</div>
        <div>{details}</div>
      </div>
      <div className={styles.riders}>
        <i className="fa-solid fa-person-biking"></i>
        <span className={styles.count}>{riderCount}</span>
      </div>
      <div className={styles.alignRight}>
        {isGoing
          ? <GoingButton loading={joining} />
          : <JoinButton loading={joining} onClick={fakeJoinHandler} />
        }
      </div>
    </div>
  );
};
