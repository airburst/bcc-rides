// import { useState, useEffect } from "react";
import { useGetRides } from "./services/FirestoreService/hooks"
import "./App.css";

// TODO: Setup linting and auto format
// TODO: import Semantic UI
// TODO: Add toast for errors and confirmations

// TODO: Set date as end of next week
const nextDate = "2022-10-09";

function App() {
  const { data, error, loading } = useGetRides(nextDate);
  const ridesFound = data && data.length > 0;

  // const { error: errSeed, done } = useSeedRides();
  // console.log("🚀 ~ ", { errSeed, done })

  return (
    <div className="App">
      <h1>BCC Rides</h1>

      {ridesFound
        ? (
          <div className="ride-list">
            {data.map(ride => (
              <div className="ride-item" key={ride.id}>
                <div>{ride.type}</div>
                <div>{ride.date}</div>
                <div>{ride.group}</div>
                <div>{ride.destination} {ride.distance}km</div>
                <div>{ride.route}</div>
                <div>{ride.leader}</div>
              </div>
            ))}
          </div>
        )
        : (
          <div className="ride-list">
            No upcoming rides before {nextDate}
          </div>
        )
      }

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  )
}

export default App
