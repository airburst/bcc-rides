import { useGetRides } from "../../services/PlanetScaleService/hooks";
import { Card } from "../../components";
// import { getNextWeek } from "../../utils"
import styles from "./Home.module.css";

// const nextDate = getNextWeek();
const nextDate = "2022-10-09 23:59:59"; // FIXME:

const App = () => {
  const { data, error, loading } = useGetRides(nextDate);
  const ridesFound = data && data.length > 0;

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {ridesFound
        ? (
          <>
            {data.map(ride => (
              <Card key={ride.id} {...ride} />
            ))}
          </>
        )
        : (
          <div className={styles.rideList}>
            No upcoming rides before {nextDate}
          </div>
        )
      }


    </div>
  )
}

export default App;
