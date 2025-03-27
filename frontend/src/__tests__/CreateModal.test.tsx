import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateModal from "../components/CreateModal";

test("Рендерит модальное окно создания рейса при открытии", () => {
    render(<CreateModal isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />);

    expect(screen.getByText("Добавить рейс")).toBeInTheDocument();
});

test("Корректное обновление значений в полях ввода", () => {
    render(<CreateModal isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />);

    const originInput = screen.getByPlaceholderText("Откуда");
    fireEvent.change(originInput, { target: { value: "Санкт-Петербург" } });

    expect(originInput).toHaveValue("Санкт-Петербург");
});

test("Вызывается onSave с корректными данными", () => {
    const onSave = jest.fn();
    render(<CreateModal isOpen={true} onClose={jest.fn()} onSave={onSave} />);

    fireEvent.change(screen.getByPlaceholderText("Откуда"), { target: { value: "Москва" } });
    fireEvent.change(screen.getByPlaceholderText("Куда"), { target: { value: "Сочи" } });
    fireEvent.click(screen.getByText("Сохранить"));

    expect(onSave).toHaveBeenCalled();
});
