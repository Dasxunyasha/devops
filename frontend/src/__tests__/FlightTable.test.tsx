import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FlightTable from "../components/FlightTable";
import { Flight } from "../types/flight";

const mockFlights: Flight[] = [
    { id: "1", origin: "Москва", destination: "Сочи", departure: new Date(), arrival: new Date() },
];

test("Рендерит табло рейсов с данными", () => {
    render(<FlightTable flights={mockFlights} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(screen.getByText("Сочи")).toBeInTheDocument();
});

test("Вызывается onEdit при нажатии на кнопку Редактировать", () => {
    const onEdit = jest.fn();
    render(<FlightTable flights={mockFlights} onEdit={onEdit} onDelete={jest.fn()} />);

    fireEvent.click(screen.getByText("✏️"));
    expect(onEdit).toHaveBeenCalledWith(mockFlights[0]);
});

test("Вызывается onDelete при нажатии на кнопку Удалить", () => {
    const onDelete = jest.fn();
    render(<FlightTable flights={mockFlights} onEdit={jest.fn()} onDelete={onDelete} />);

    fireEvent.click(screen.getByText("🗑"));
    expect(onDelete).toHaveBeenCalledWith("1");
});
