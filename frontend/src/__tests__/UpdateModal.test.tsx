import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';

import UpdateModal from "../components/UpdateModal";
import { Flight } from "../types/flight";

const mockFlight: Flight = {
    id: "1",
    origin: "Москва",
    destination: "Сочи",
    departure: new Date(),
    arrival: new Date(),
};

test("Рендерит модальное окно обновления рейса с корректными данными", () => {
    render(<UpdateModal isOpen={true} flight={mockFlight} onClose={jest.fn()} onSave={jest.fn()} />);

    expect(screen.getByDisplayValue("Москва")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Сочи")).toBeInTheDocument();
});

test("Вызывается onSave с корректными данными", () => {
    const onSave = jest.fn();
    render(<UpdateModal isOpen={true} flight={mockFlight} onClose={jest.fn()} onSave={onSave} />);

    fireEvent.change(screen.getByLabelText("Откуда"), { target: { value: "Санкт-Петербург" } });
    fireEvent.click(screen.getByText("Сохранить"));

    expect(onSave).toHaveBeenCalled();
});
