import { useLongPress } from 'use-long-press';
import { Badge } from "../../components";
import { Ride } from "../../types";
import styles from "./Card.module.css";

type Props = {
  ride: Ride;
}

/**
 * All ride instances share common date and type
 */
export const Card: React.FC<Props> = ({ ride }) => {
  const { title, rideGroup, riderCount, destination, distance } = ride;
  const details = destination ? `${destination} - ${distance} km` : `${distance} km`;

  const onPress = useLongPress(() => {
    alert('Show details: ' + JSON.stringify(ride));
  }, {
    threshold: 500,
    cancelOnMovement: true,
  });

  return (
    <div className={styles.container} {...onPress()}>
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
