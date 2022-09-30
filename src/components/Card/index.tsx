import { useLongPress } from 'use-long-press';
import { Badge } from "../../components";
import { Ride } from "../../types";
import styles from "./Card.module.css";

type Props = {
  ride: Ride;
  onPress: (ride: Ride) => void;
}

// @ts-ignore
const isMobile = navigator?.userAgentData?.mobile;

/**
 * All ride instances share common date and type
 */
export const Card: React.FC<Props> = ({ ride, onPress }) => {
  const { title, rideGroup, riderCount, destination, distance } = ride;
  const details = destination ? `${destination} - ${distance} km` : `${distance} km`;

  const pressHandler = useLongPress(() => onPress(ride), {
    threshold: isMobile ? 500 : 0,
    cancelOnMovement: true,
  });

  return (
    <div className={styles.container} {...pressHandler()}>
      <div className={styles.row}>
        <div className={styles.title}>{title}</div>
        <Badge text={rideGroup} />
      </div>
      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.riders}>
            <i className="fa-solid fa-person-biking"></i>
            <span className={styles.count}>{riderCount}</span>
          </div>
        </div>
        <div>{details}</div>
      </div>
    </div>
  );
};
