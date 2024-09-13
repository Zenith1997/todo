import React, { useState, useEffect } from 'react';
import {
    Container, Typography, List, ListItem, ListItemText,
    ListItemSecondaryAction, IconButton,ListItemIcon, Button, Box
} from '@mui/material';
import { Delete, Edit, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import AddTodoModal from './AddToDoModal';
import EditTodoModal from './EditTodoModal'; // Import the new EditTodoModal
import { useTheme } from '@mui/material/styles';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'Medium', date: new Date() });
    const [editingTodo, setEditingTodo] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false); // State for Edit Modal
    const { logout } = useAuth();
    const theme = useTheme();

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
                <Box>

                    <Button
                        variant="contained"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Box>

            </Box>
            <Box
                display="flex"
                justifyContent="start"
                alignItems="center"

                sx={{mb: 8,
                    backgroundColor: theme.palette.background.paper}}
            >

                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.ashBlue.main,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                            borderRadius: '8px',
                            padding: '10px 20px',
                            fontWeight: 600,
                            position: 'fixed',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            marginRight: 2,
                            marginBottom:7,
                        }}
                        variant="contained"
                        onClick={handleOpenAddModal}
                    >
                        Add Task
                    </Button>
                </Box>

            </Box>

            {/* Scrollable Todo List */}

            <Box
                sx={{
                    maxHeight: '80vh',
                    overflow: 'auto',
                  //border: `20px solid ${theme.palette.divider}`,
                    borderRadius: '10px',


                    backgroundColor: theme.palette.background.paper
                }}
            >
                <List    sx={{   padding:4}} >

                    {todos.map((todo) => (
                        <ListItem

                            key={todo.id}
                            dense
                            button
                            onClick={() => toggleTodo(todo.id)}
                            sx={{
                                borderBottom: `9px solid ${theme.palette.secondary.main}`,
                                marginTop:2,

                                '&:last-of-type': {
                                    borderBottom: 'none'
                                },
                                borderRadius: '10px',
                                bgcolor: todo.completed ? theme.palette.action.disabledBackground : theme.palette.primary.main,
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    bgcolor: theme.palette.action.hover,
                                }
                            }}
                        >
                            <ListItemIcon>
                                {todo.completed ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                sx={{
                                    display: 'flex',              // Aligns elements in a flexible layout
                                    flexDirection: 'column',      // Stacks vertically first
                                }}
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                           {todo.title} {/* Title on the left */}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 1 }}>
                                            {todo.priority} Priority {/* Priority on the right */}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                            {todo.description} {/* Description on the left */}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 2 }}>
                                            Due: {new Date(todo.date).toLocaleString()} {/* Due date on the right */}
                                        </Typography>
                                    </Box>
                                }
                            />


                            <ListItemSecondaryAction>
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
