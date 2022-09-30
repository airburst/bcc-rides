import { Dispatch, SetStateAction } from "react";
import { Ride } from "../../types";
import { Modal } from "./index";
import styles from "./Modal.module.css";

type Props = {
  ride: Ride | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const RideModal: React.FC<Props> = ({ ride, setIsOpen }) => {
  if (!ride) {
    return null;
  }

  const {
    id,
    title,
    rideGroup,
    destination,
    distance,
    leader,
    route,
    speed,
    riderCount
  } = ride;

  return (
    <Modal heading={title} setIsOpen={setIsOpen}>
      <>
        <div className={styles.contentRow}>
          <div>{rideGroup} Group</div>
        </div>
        <div className={styles.contentRow}>
          {destination && <div>{destination}</div>}
          {distance && <div>{distance} km</div>}
        </div>
        {route && (
          <div className={styles.contentRow}>
            <div>Route</div>
            <a href={route}>{route}</a>
          </div>
        )}
        {leader && (
          <div className={styles.contentRow}>
            <div>Leader</div>
            <div>{leader}</div>
          </div>
        )}
        <div className={styles.going}>
          <div>Going ({riderCount})</div>
        </div>
      </>
    </Modal>
  )
}