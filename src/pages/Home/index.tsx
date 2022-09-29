import { useGetRides } from "../../services/PlanetScaleService/hooks";
import { Card, Loading } from "../../components";
import { getNextWeek, transformRideData } from "../../utils"
import styles from "./Home.module.css";

const realNextDate = getNextWeek();
console.log("🚀 ~ realNextDate", realNextDate)
const nextDate = "2022-10-09 23:59:59"; // FIXME:

const App = () => {
  const { data, error, loading } = useGetRides(nextDate);
  const ridesFound = data && data.length > 0;

  if (loading) {
    return (
      <Loading />
    )
  }

  if (error || !ridesFound) {
    return (
      <div className="error-message">
        {error}
      </div>
    )
  }

  const groupedRides = transformRideData(data!);
  console.log("🚀 ~ file: index.tsx ~ line 15 ~ App ~ groupedRides", groupedRides)

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
