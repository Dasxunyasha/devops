import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Flight } from "../types/flight";

interface CreateModalProps {
    isOpen: boolean;
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


const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<Flight>({
        id: "",
        origin: "",
        destination: "",
        departure:  new Date(),
        arrival:  new Date(),
    });

    const handleChange = (key: keyof Flight) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [key]: event.target.value }));
    };

    const handleDateChange = (key: "departure" | "arrival") => (date: Date | null) => {
        if (date) {
            setFormData((prev) => ({ ...prev, [key]: date }));
        }
    };

    const handleSubmit = () => {
        onSave({ ...formData, id: new Date().toISOString() });
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Добавить рейс
                </Typography>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <TextField placeholder="Откуда" value={formData.origin} onChange={handleChange("origin")} />
                    <TextField placeholder="Куда" value={formData.destination} onChange={handleChange("destination")} />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                            <DateTimePicker
                                label='Время вылета:'
                                value={formData.departure}
                                onChange={handleDateChange("departure")}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </div>
                        <div>
                            <DateTimePicker
                                label='Время прилета:'
                                value={formData.arrival}
                                onChange={handleDateChange("arrival")}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </div>
                    </LocalizationProvider>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                    <Button variant="outlined" onClick={onClose}>Отмена</Button>
                    <Button variant="contained" onClick={handleSubmit}>Сохранить</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default CreateModal;