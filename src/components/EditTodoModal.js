import React from 'react';
import {
    Dialog, DialogContent, DialogTitle, TextField, Box, Button, MenuItem, IconButton
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Close } from '@mui/icons-material';
const EditTodoModal = ({ open, onClose, editingTodo, setEditingTodo, saveEdit, isMobile }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile} // Make it full screen on mobile if needed
        >

                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                    aria-label="close"
                >
                    <Close />
                </IconButton>

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
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                    <TextField
                        select
                        label="Priority"
                        value={editingTodo.priority}
                        onChange={(e) => setEditingTodo({ ...editingTodo, priority: e.target.value })}
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
                </Box>

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
