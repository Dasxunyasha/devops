import React, { useState } from "react";
import Button from "@atlaskit/button";
import { v4 as uuidv4 } from "uuid";
import FlightTable from "./components/FlightTable";
import FlightForm from "./components/FlightForm";
import { Flight } from "./types/flight";

const initialFlights: Flight[] = [
  { id: uuidv4(), from: "Moscow", to: "London", departure: new Date("2025-03-21T12:00:00"), arrival: new Date("2025-03-21T14:30:00")  },
  { id: uuidv4(), from: "New York", to: "Paris", departure: new Date("2025-03-21T15:00:00"),  arrival: new Date("2025-03-21T06:45:00") },
];

const App: React.FC = () => {
  const [flights, setFlights] = useState(initialFlights);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

    const openModal = (flight?: Flight) => {
        setSelectedFlight(flight || null);
        setIsModalOpen(true);
    };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (flight: Flight) => {
    setFlights((prev) => prev.some((f) => f.id === flight.id)
        ? prev.map((f) => (f.id === flight.id ? flight : f))
        : [...prev, flight]
    );
  };

  const handleDelete = (id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
  };

  return (
      <div style={{ padding: 20 }}>
        <h2>Онлайн Табло</h2>
        <Button appearance="primary" onClick={() => openModal()}>Добавить рейс</Button>
        <FlightTable flights={flights} onEdit={openModal} onDelete={handleDelete} />
        <FlightForm isOpen={isModalOpen} flight={selectedFlight} onClose={closeModal} onSave={handleSave} />
      </div>
  );
};

export default App;