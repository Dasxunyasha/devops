import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Flight } from "../types/flight";

interface UpdateModalProps {
    isOpen: boolean;
    flight: Flight | null;
    onClose: () => void;
    onSave: (flight: Flight) => void;
}

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, flight, onClose, onSave }) => {
    const [formData, setFormData] = useState<Flight | null>(null);

    useEffect(() => {
        if (flight) {
            setFormData({
                ...flight,
                departure: new Date(flight.departure),
                arrival: new Date(flight.arrival),
            });
        }
    }, [flight]);

    const handleChange = (key: keyof Flight) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData((prev) => ({
                ...prev!,
                [key]: event.target.value,
            }));
        }
    };

    const handleDateChange = (key: keyof Flight) => (date: Date | null) => {
        if (formData) {
            setFormData((prev) => ({
                ...prev!,
                [key]: date,
            }));
        }
    };

    const handleSubmit = () => {
        if (formData) {
            onSave({
                ...formData,
                departure: formData.departure,
                arrival: formData.arrival,
            });
            onClose();
        }
    };
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Редактировать рейс
                </Typography>
                {formData && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <TextField
                            label="Откуда"
                            value={formData.origin}
                            onChange={handleChange("origin")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Куда"
                            value={formData.destination}
                            onChange={handleChange("destination")}
                            fullWidth
                            margin="normal"
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Время вылета"
                                value={formData.departure}
                                onChange={handleDateChange("departure")}
                                renderInput={(params: any) => <TextField {...params} fullWidth margin="normal" />}
                            />
                            <DateTimePicker
                                label="Время прилета"
                                value={formData.arrival}
                                onChange={handleDateChange("arrival")}
                                renderInput={(params: any) => <TextField {...params} fullWidth margin="normal" />}
                            />
                        </LocalizationProvider>
                    </div>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                    <Button variant="outlined" onClick={onClose}>Отмена</Button>
                    <Button variant="contained" onClick={handleSubmit}>Сохранить</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default UpdateModal;