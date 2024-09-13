import React, { useState, useEffect } from 'react';
import {
    Container, Typography, List, ListItem, ListItemText,
    ListItemSecondaryAction, IconButton, Button, TextField,
    MenuItem, Box
} from '@mui/material';
import { Delete, Edit, Check } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'Medium', date: new Date() });
    const [editingTodo, setEditingTodo] = useState(null);
    const { logout } = useAuth();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (newTodo.title.trim() !== '') {
            setTodos([...todos, { ...newTodo, id: Date.now(), completed: false }]);
            setNewTodo({ title: '', description: '', priority: 'Medium', date: new Date() });
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const startEditing = (todo) => {
        setEditingTodo(todo);
    };

    const saveEdit = () => {
        setTodos(todos.map(todo =>
            todo.id === editingTodo.id ? editingTodo : todo
        ));
        setEditingTodo(null);
    };

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 2 }}
            >
                <Typography variant="h4" component="h1">
                    Todo List
                </Typography>
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    select
                    label="Priority"
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
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
                        value={newTodo.date}
                        onChange={(date) => setNewTodo({ ...newTodo, date })}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>
                <Button variant="contained" onClick={addTodo} sx={{ mt: 1 }}>
                    Add Todo
                </Button>
            </Box>

            {/* Todo List */}
            <List>
                {todos.map((todo) => (
                    <ListItem key={todo.id} dense button onClick={() => toggleTodo(todo.id)}>
                        <ListItemText
                            primary={`${todo.title} (${todo.priority} Priority)`}
                            secondary={`${todo.description} - Due: ${new Date(todo.date).toLocaleString()}`}
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="done" onClick={() => toggleTodo(todo.id)}>
                                <Check color={todo.completed ? "primary" : "action"} />
                            </IconButton>
                            <IconButton edge="end" aria-label="edit" onClick={() => startEditing(todo)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            {/* Edit Todo */}
            {editingTodo && (
                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="Edit Title"
                        value={editingTodo.title}
                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Edit Description"
                        value={editingTodo.description}
                        onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Edit Priority"
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
                            label="Edit Due Date and Time"
                            value={editingTodo.date}
                            onChange={(date) => setEditingTodo({ ...editingTodo, date })}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" onClick={saveEdit} sx={{ mt: 1 }}>
                        Save Edit
                    </Button>
                </Box>
            )}

        </Container>
    );
};

export default TodoList;
