import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Flight } from "../types/flight";

interface FlightTableProps {
    flights: Flight[];
    onEdit: (flight: Flight) => void;
    onDelete: (id: string) => void;
}

const FlightTable: React.FC<FlightTableProps> = ({ flights, onEdit, onDelete }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="flight table">
                <TableHead>
                    <TableRow>
                        <TableCell>Откуда</TableCell>
                        <TableCell>Куда</TableCell>
                        <TableCell>Время вылета</TableCell>
                        <TableCell>Время прилета</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flights.map((flight) => (
                        <TableRow key={flight.id}>
                            <TableCell component="th" scope="row">
                                {flight.origin}
                            </TableCell>
                            <TableCell>{flight.destination}</TableCell>
                            <TableCell>{formatDate(flight.departure.toLocaleString())}</TableCell>
                            <TableCell>{formatDate(flight.arrival.toLocaleString())}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(flight)}>✏️</Button>
                                <Button onClick={() => onDelete(flight.id)}>🗑</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FlightTable;