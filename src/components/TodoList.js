import React, { useState, useEffect } from 'react';
import {
    Container, Typography, MenuItem, FormControl, Select, Tooltip ,List, ListItem, ListItemText,
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

    const handlePriorityChange = (id, newPriority) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, priority: newPriority } : todo
        ));
    };

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
                gap="4"
                display="flex"
                justifyContent="space-between"
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

<Box

    justifyContent="space-between"
    sx={{
    //
    //     backgroundColor: theme.palette.ashBlue.main,
    //     '&:hover': {
    //         backgroundColor: theme.palette.primary.dark,
    //     },
    //
    //
    //
    //     fontWeight: 600,
    //     textTransform: 'none',
    //     fontSize: '0.875rem',
    //     marginRight: 2,
    //     marginBottom: 0,
        maxWidth:'auto',
        gap:2,

    }}
    >
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

            </Box>




            {/* Scrollable Todo List */}

            <Box
                sx={{
                    maxHeight: '80vh',
                    overflow: 'auto',
                  //border: `20px solid ${theme.palette.divider}`,
                    borderRadius: '10px',
                    padding:'10px',

                    backgroundColor: theme.palette.quaternary.main
                }}
            >
                <List    sx={{   padding:0}} >

                    {filteredTodos.map((todo) => (
                        <ListItem
                            key={todo.id}
                            dense
                            button
                            sx={{
                                borderBottom: `5px solid ${theme.palette.secondary.main}`,
                                marginBottom: 1,
                                '&:last-of-type': { borderBottom: 'none' },
                                borderRadius: '10px',
                                bgcolor: todo.completed
                                    ? theme.palette.text.secondary:theme.palette.primary.dark,

                                transition: 'background-color 0.3s ease',
                                '&:hover': { bgcolor: theme.palette.action.hover },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px', // Adjust padding as needed
                            }}
                        >
                            <ListItemIcon onClick={(e) => {
                                e.stopPropagation(); // Prevent click event from propagating to ListItem
                                toggleTodo(todo.id);
                            }}>
                                {todo.completed ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />}
                            </ListItemIcon>

                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', marginRight: 4, justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                        {todo.title}
                                    </Typography>

                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Tooltip title={todo.description} arrow>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                maxWidth: '500px', // Restrict width
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {todo.description}
                                        </Typography>
                                    </Tooltip>
                                </Box>
                                <Box sx={{ display: 'flex',flexDirection:"column", justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                        Due: {new Date(todo.date).toLocaleString()}
                                    </Typography>
                                    <FormControl sx={{ display:"",minWidth: 120,marginLeft :0 ,height:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between" }}>
                                        <FormLabel sx={{ display: 'flex' }}>Priority</FormLabel>
                                        <Select
                                            value={todo.priority}
                                            onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
                                            sx={{ backgroundColor: 'white', borderRadius: '8px', padding: '0 10px',height:22,
                                                bgcolor:
                                                    todo.priority === 'High'
                                                        ? theme.palette.error.main
                                                        : todo.priority === 'Medium'
                                                            ? theme.palette.warning.main
                                                            : theme.palette.success.main,
                                            }}
                                        >
                                            <MenuItem value="High">High</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton edge="end" aria-label="edit" onClick={(e) => {
                                    e.stopPropagation(); // Prevent click event from propagating to ListItem
                                    startEditing(todo);
                                }}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={(e) => {
                                    e.stopPropagation(); // Prevent click event from propagating to ListItem
                                    deleteTodo(todo.id);
                                }}>
                                    <Delete />
                                </IconButton>
                            </Box>
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
