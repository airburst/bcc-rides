import { useState } from "react";
import { useGetRides } from "../../services/PlanetScaleService/hooks";
import { RideGroup, Loading, RideModal } from "../../components";
import { useLocalStorage } from "../../hooks";
import { getNextWeek, groupRides, formatDate } from "../../utils"
import { Ride, User } from "../../types"
import styles from "./Home.module.css";

let nextDate = getNextWeek();
nextDate = "2022-10-09 23:59:59"; // FIXME:

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [user] = useLocalStorage<User | null>("bcc-user", null); // FIXME:
  const userId = user ? user.id : null;
  const { data, error, loading } = useGetRides(userId, nextDate);

  if (loading) {
    return (
      <Loading text="Fetching rides..." />
    )
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    )
  }

  const handleRidePress = (ride: Ride) => {
    setSelectedRide(ride);
    setIsOpen(true);
  }

  const groupedRides = groupRides(data!);
  const ridesFound = groupedRides.length > 0;

  return (
    <div className={styles.grid}>
      {ridesFound
        ? (
          <>
            {groupedRides.map((group, index) => (
              <RideGroup key={`group-${index}`} group={group} onPress={handleRidePress} />
            ))}
          </>
        )
        : (
          <div className={styles.noRides}>
            No planned rides before{' '}
            {formatDate(nextDate)}
          </div>
        )
      }
      {isOpen && <RideModal ride={selectedRide} setIsOpen={setIsOpen} />}
    </div>
  )
}

export default App;
