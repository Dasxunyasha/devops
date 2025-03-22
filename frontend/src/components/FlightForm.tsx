import React, { useState, useEffect } from "react";
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from "@atlaskit/modal-dialog";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { DatePicker } from "@atlaskit/datetime-picker";
import { Flight } from "../types/flight";

interface FlightFormProps {
    isOpen: boolean;
    flight: Flight | null;
    onClose: () => void;
    onSave: (flight: Flight) => void;
}

const FlightForm: React.FC<FlightFormProps> = ({ isOpen, flight, onClose, onSave }) => {
    const [formData, setFormData] = useState<Flight>({
        id: "",
        from: "",
        to: "",
        departure: new Date(),
        arrival: new Date(),
    });

    useEffect(() => {
        if (flight) {
            setFormData({
                ...flight,
                departure: new Date(flight.departure),
                arrival: new Date(flight.arrival),
            });
        } else {
            setFormData({
                id: "",
                from: "",
                to: "",
                departure: new Date(),
                arrival: new Date(),
            });
        }
    }, [flight]);

    const handleChange = (key: keyof Flight) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [key]: event.target.value }));
    };

    const handleDateChange = (key: "departure" | "arrival") => (date: string) => {
        setFormData((prev) => ({ ...prev, [key]: new Date(date) }));
    };

    const handleSubmit = () => {
        onSave({ ...formData, id: flight?.id || new Date().toISOString() });
        onClose();
    };

    const formatDateToString = (date: Date) => {
        return date.toISOString().slice(0, 16);
    };

    return (
        <ModalTransition>
            {isOpen && (
                <Modal onClose={onClose}>
                    <ModalHeader>
                        <ModalTitle>{flight ? "Редактировать рейс" : "Добавить рейс"}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <TextField placeholder="Откуда" value={formData.from} onChange={handleChange("from")} />
                            <TextField placeholder="Куда" value={formData.to} onChange={handleChange("to")} />
                            <div>
                                <label>Время вылета:</label>
                                <DatePicker
                                    value={formatDateToString(formData.departure)}
                                    onChange={handleDateChange("departure")}
                                    placeholder="Выберите дату и время"
                                />
                            </div>
                            <div>
                                <label>Время прилета:</label>
                                <DatePicker
                                    value={formatDateToString(formData.arrival)}
                                    onChange={handleDateChange("arrival")}
                                    placeholder="Выберите дату и время"
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button appearance="subtle" onClick={onClose}>Отмена</Button>
                        <Button appearance="primary" onClick={handleSubmit}>Сохранить</Button>
                    </ModalFooter>
                </Modal>
            )}
        </ModalTransition>
    );
};

export default FlightForm;
