import React from 'react';
import {
    Dialog, DialogContent, DialogTitle, TextField, Box, Button, MenuItem
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const EditTodoModal = ({ open, onClose, editingTodo, setEditingTodo, saveEdit }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={editingTodo.description}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    select
                    label="Priority"
                    value={editingTodo.priority}
                    onChange={(e) => setEditingTodo({ ...editingTodo, priority: e.target.value })}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Due Date and Time"
                        value={editingTodo.date}
                        onChange={(date) => setEditingTodo({ ...editingTodo, date })}
                        renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                    />
                </LocalizationProvider>
                <Button
                    variant="contained"
                    onClick={saveEdit}
                    sx={{ mt: 2 }}
                >
                    Save Edit
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditTodoModal;
