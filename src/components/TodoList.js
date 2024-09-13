import React, { useState, useEffect } from 'react';
import {
    Container, Typography, List, ListItem, ListItemText,
    ListItemSecondaryAction, IconButton, Button, MenuItem, Box, TextField
} from '@mui/material';
import { Delete, Edit, Check } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import AddTodoModal from './AddToDoModal';
import EditTodoModal from './EditTodoModal'; // Import the new EditTodoModal

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'Medium', date: new Date() });
    const [editingTodo, setEditingTodo] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false); // State for Edit Modal
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
            handleCloseAddModal(); // Close the add modal after adding
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
        setOpenEditModal(true); // Open the edit modal
    };

    const saveEdit = () => {
        setTodos(todos.map(todo =>
            todo.id === editingTodo.id ? editingTodo : todo
        ));
        setEditingTodo(null);
        handleCloseEditModal(); // Close the edit modal after saving
    };

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);
    const handleCloseEditModal = () => setOpenEditModal(false);

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
                <Button variant="contained" onClick={handleOpenAddModal}>
                    Add Task
                </Button>
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
            </Box>

            {/* Scrollable Todo List */}
            <Box sx={{ maxHeight: 400, overflow: 'auto', border: '1px solid #ddd', borderRadius: '4px', mt: 2 }}>
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
            </Box>

            {/* Modal for Adding Todo */}
            <AddTodoModal
                open={openAddModal}
                onClose={handleCloseAddModal}
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                addTodo={addTodo}
            />

            {/* Modal for Editing Todo */}
            {editingTodo && (
                <EditTodoModal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    editingTodo={editingTodo}
                    setEditingTodo={setEditingTodo}
                    saveEdit={saveEdit}
                />
            )}
        </Container>
    );
};

export default TodoList;
