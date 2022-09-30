import { useGetRides } from "../../services/PlanetScaleService/hooks";
import { RideGroup, Loading } from "../../components";
import { getNextWeek, groupRides, formatDate } from "../../utils"
import styles from "./Home.module.css";

let nextDate = getNextWeek();
nextDate = "2022-10-09 23:59:59"; // FIXME:

const App = () => {
  const { data, error, loading } = useGetRides(nextDate);

  if (loading) {
    return (
      <Loading />
    )
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    )
  }

  const groupedRides = groupRides(data!);
  const ridesFound = groupedRides.length > 0;

  return (
    <div className={styles.grid}>
      {ridesFound
        ? (
          <>
            {groupedRides.map((group, index) => (
              <RideGroup key={`group-${index}`} group={group} />
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
    </div>
  )
}

export default App;
