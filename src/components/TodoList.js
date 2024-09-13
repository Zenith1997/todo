import React, { useState, useEffect } from 'react';
import {
    Container, Typography, MenuItem, FormControl, Select, List, ListItem, ListItemText,
    ListItemSecondaryAction, IconButton, ListItemIcon, Button, Box, InputLabel, FormLabel
} from '@mui/material';
import { Delete, Edit, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import AddTodoModal from './AddToDoModal';
import EditTodoModal from './EditTodoModal'; // Import the new EditTodoModal
import { useTheme } from '@mui/material/styles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'Medium', date: new Date() });
    const [filterPriority, setFilterPriority] = useState('All'); // State for filtering by priority
    const [filterStatus, setFilterStatus] = useState('All'); // State for filtering by status
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
    const filteredTodos = todos.filter(todo => {
        const priorityMatches = filterPriority === 'All' || todo.priority === filterPriority;
        const statusMatches =
            filterStatus === 'All' ||
            (filterStatus === 'Done' && todo.completed) ||
            (filterStatus === 'Todo' && !todo.completed);
        return priorityMatches && statusMatches;
    });
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


                    <Button
                        variant="contained"
                        onClick={logout}
                    >
                        Logout
                    </Button>
            </Box>


            <Box
                display="flex"
                justifyContent="start"
                alignItems="center"

                sx={{mb:2}}
                    //backgroundColor: theme.palette.background.paper}}
            >


                    <Button
                        sx={{
                            backgroundColor: theme.palette.ashBlue.main,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                            borderRadius: '8px',
                            padding: '10px 20px',
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            marginRight: 2,
                            marginBottom: 0,
                        }}
                        variant="contained"
                        onClick={handleOpenAddModal}
                    >
                        Add Task
                    </Button>


                <FormControl
                    sx={{
                        margin: 0,
                        padding: 0,
                        minWidth: '120px', // Ensure the component takes only the necessary width
                    }}
                >
                    <FormLabel>Filter by Priority</FormLabel>
                    <Select
                        labelId="filter-label"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}                       // label="Filter by Priority"
                        sx={{
                            padding: '0',  // Removes internal padding inside the select field
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>

                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        margin: 0,
                        padding: 0,
                        minWidth: '120px', // Ensure the component takes only the necessary width
                    }}
                >
                    <FormLabel>Filter by Status</FormLabel>
                    <Select
                        labelId="filter-label"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}                        // label="Filter by Priority"
                        sx={{
                            padding: '0',  // Removes internal padding inside the select field
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        <MenuItem value="Todo">Todo</MenuItem>


                    </Select>
                </FormControl>


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
                <List    sx={{   padding:0}} >

                    {filteredTodos.map((todo) => (
                        <ListItem

                            key={todo.id}
                            dense
                            button
                            onClick={() => toggleTodo(todo.id)}
                            sx={{
                                borderBottom: `5px solid ${theme.palette.secondary.main}`,
                                marginBottom:1,

                                '&:last-of-type': {
                                    borderBottom: 'none'
                                },
                                borderRadius: '10px',
                                bgcolor: todo.completed
                                    ? theme.palette.text.secondary // Use a consistent color for completed tasks
                                    : todo.priority === 'High'
                                        ? theme.palette.error.main // Red for high-priority tasks
                                        : todo.priority === 'Medium'
                                            ? theme.palette.warning.main // Orange for medium-priority tasks
                                            : theme.palette.success.main, // Green for low-priority tasks
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginRight:4 }}>
                                        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                           {todo.title} {/* Title on the left */}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 1 }}>
                                            {todo.priority} Priority {/* Priority on the right */}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1,marginRight:4 }}>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                            {todo.description} {/* Description on the left */}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 2 }}>
                                            Due: {new Date(todo.date).toLocaleString()} {/* Due date on the right */}
                                        </Typography>
                                    </Box>
                                }
                            />



                                <IconButton edge="end" aria-label="edit" onClick={() => startEditing(todo)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                                    <Delete />
                                </IconButton>

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
