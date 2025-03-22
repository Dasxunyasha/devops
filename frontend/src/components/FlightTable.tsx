import React from "react";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";
import Button from "@atlaskit/button";
import { Flight } from "../types/flight";

interface FlightTableProps {
    flights: Flight[];
    onEdit: (flight: Flight) => void;
    onDelete: (id: string) => void;
}

const FlightTable: React.FC<FlightTableProps> = ({ flights, onEdit, onDelete }) => {
    return (
        <DynamicTableStateless
            head={{
                cells: [
                    { content: "Откуда" },
                    { content: "Куда" },
                    { content: "Время вылета" },
                    { content: "Время прилета" },
                    { content: "Действия" },
                ],
            }}
            rows={flights.map((flight) => ({
                key: flight.id,
                cells: [
                    { content: flight.from },
                    { content: flight.to },
                    { content: flight.departure.toLocaleString() },
                    { content: flight.arrival.toLocaleString() },
                    {
                        content: (
                            <>
                                <Button onClick={() => onEdit(flight)}>✏️</Button>
                                <Button onClick={() => onDelete(flight.id)}>🗑</Button>
                            </>
                        ),
                    },
                ],
            }))}
        />
    );
};

export default FlightTable;