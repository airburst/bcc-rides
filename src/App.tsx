// import { useState, useEffect } from "react";
import { useGetRides } from "./services/FirestoreService/hooks"
import "./App.css";

// TODO: Setup linting and auto format
// TODO: import Semantic UI
// TODO: Add toast for errors and confirmations

function App() {
  const { data, error, loading } = useGetRides("2022", "sunday");

  return (
    <div className="App">
      <h1>BCC Rides</h1>

      {data && data.length > 0 && (
        <div className="ride-list">
          {data.map(ride => (
            <div className="ride-item" key={ride.group}>
              <div>{ride.date}</div>
              <div>{ride.group}</div>
              <div>{ride.destination} {ride.distance}km</div>
              <div>{ride.route}</div>
              <div>{ride.leader}</div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  )
}

export default App
