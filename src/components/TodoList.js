import React, { useState, useEffect } from 'react';
import {
    Container, Typography, MenuItem, FormControl, Select, Tooltip, List, ListItem, ListItemText,
    ListItemSecondaryAction, IconButton, ListItemIcon, Button, Box, InputLabel, FormLabel, useMediaQuery
} from '@mui/material';
import { Delete, Edit, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import AddTodoModal from './AddToDoModal';
import EditTodoModal from './EditTodoModal'; // Import the new EditTodoModal
import { useTheme } from '@mui/material/styles';

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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                flexDirection={isMobile ? 'row' : 'row'}
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 2, mb: 5 }}
            >
                <Typography variant="h4" component="h1">
                    Todo List
                </Typography>

                <Button
                    variant="contained"
                    onClick={logout}
                    sx={{ mt: isMobile ? 2 : 0 }}
                >
                    Logout
                </Button>
            </Box>

            <Box
                display="flex"
                flexDirection={isMobile ? 'row' : 'row'}
                gap={2}
                justifyContent={isMobile ? 'center' : 'space-between'}
                alignItems="center"
                sx={{ mb: 2 }}
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
                        marginBottom: isMobile ? 2 : 0,
                    }}
                    variant="contained"
                    onClick={handleOpenAddModal}
                >
                    Add Task
                </Button>

                <Box
                    display="flex"
                    flexDirection={isMobile ? 'row' : 'row'}
                    gap={2}
                    maxWidth="auto"
                >
                    <FormControl
                        sx={{
                            minWidth: '120px',
                        }}
                    >
                        <InputLabel
                            id="filter-priority-label"
                            sx={{
                                top: -8,
                            }}
                        >
                            Filter by Priority
                        </InputLabel>

                        <Select
                            labelId="filter-priority-label"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.primary.main,
                                '& .MuiSelect-icon': {
                                    color: theme.palette.primary.main,
                                },
                                '& .MuiInputBase-input': {
                                    color: theme.palette.primary.main,
                                    padding: '8px 16px',
                                },
                                padding: 0,
                                margin: 0,
                                borderRadius: '4px',
                            }}
                        >
                            <MenuItem value="All" sx={{ backgroundColor: theme.palette.background.default, padding: '8px 16px' }}>
                                All
                            </MenuItem>
                            <MenuItem value="High" sx={{ backgroundColor: theme.palette.error.light, color: theme.palette.error.contrastText, padding: '8px 16px' }}>
                                High
                            </MenuItem>
                            <MenuItem value="Medium" sx={{ backgroundColor: theme.palette.warning.light, color: theme.palette.warning.contrastText, padding: '8px 16px' }}>
                                Medium
                            </MenuItem>
                            <MenuItem value="Low" sx={{ backgroundColor: theme.palette.success.light, color: theme.palette.success.contrastText, padding: '8px 16px' }}>
                                Low
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl
                        sx={{
                            minWidth: '120px',
                        }}
                    >
                        <InputLabel
                            sx={{
                                top: -8,
                            }}
                        >
                            Filter by Status
                        </InputLabel>

                        <Select
                            labelId="filter-status-label"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                '& .MuiSelect-icon': {
                                    color: theme.palette.text.primary,
                                },
                                '& .MuiInputBase-input': {
                                    padding: '8px 16px',
                                    color: theme.palette.text.primary,
                                },
                                padding: 0,
                                margin: 0,
                                borderRadius: '4px',
                            }}
                        >
                            <MenuItem value="All" sx={{ padding: '8px 16px' }}>All</MenuItem>
                            <MenuItem value="Done" sx={{ padding: '8px 16px' }}>Done</MenuItem>
                            <MenuItem value="Todo" sx={{ padding: '8px 16px' }}>Todo</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Scrollable Todo List */}
            {isMobile?(<Box
                sx={{
                    maxHeight: '80vh',
                    overflow: 'auto',
                    borderRadius: '10px',
                    padding: '10px',
                    backgroundColor: theme.palette.quaternary.main
                }}
            >
                <List sx={{ padding: 0 }}>
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
                                    ? theme.palette.text.secondary
                                    : theme.palette.primary.dark,
                                transition: 'background-color 0.3s ease',
                                '&:hover': { bgcolor: theme.palette.ashBlue.main },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent:isMobile ?'start':'space-between',
                                padding: '10px',
                                flexDirection: isMobile ? 'row' : 'row',
                            }}
                        >
                            <ListItemIcon onClick={(e) => {
                                e.stopPropagation(); // Prevent click event from propagating to ListItem
                                toggleTodo(todo.id);
                            }} sx={{ color: 'blue' }}>
                                {todo.completed ? <CheckBox /> : <CheckBoxOutlineBlank />}
                            </ListItemIcon>

<Box>               <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                        {todo.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                        Due: {new Date(todo.date).toLocaleString()}
                                    </Typography>

                                    <Tooltip title={todo.description} arrow>
                                        {!isMobile  ?  (<Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                maxWidth: '300px', // Adjusted for mobile view
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {todo.description}
                                        </Typography>):(<Typography sx={{

                                            color:theme.palette.success.main,
                                        }}>Description</Typography>)}
                                    </Tooltip>
</Box>
<Box>
    <Box sx={{ display: 'flex-end', justifyContent: 'center',alignItems:"flex-start",flexDirection:"column" }}>


    <IconButton edge="end" aria-label="edit" onClick={(e) => {
                                    e.stopPropagation(); // Prevent click event from propagating to ListItem
                                    startEditing(todo);
                                }}>
                                    <Edit  sx={{ color: theme.palette.error.edit }} />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from propagating to ListItem
                                        deleteTodo(todo.id);
                                    }}
                                    sx={{ color: theme.palette.error.main }}
                                >
                                    <Delete sx={{ color: theme.palette.error.main }} />
                                </IconButton>
        </Box>

        <FormControl sx={{ display:"flex",justifyContent:"flex-start",border: 'none', minWidth: 120, height: 22, flexDirection: 'column', alignItems: 'center' }}>
        <FormLabel variant="body2" sx={{ margin:'0',fontSize: '0.875rem', color: theme.palette.text.primary }}>
            Priority
        </FormLabel>
        <Select
            value={todo.priority}
            onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
            sx={{
                color: theme.palette.text.secondary,
                border: 'none',
                '& .MuiSelect-icon': {
                    color: theme.palette.text.primary,
                },
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '0 10px',
                height: 22,
                fontSize: '0.875rem',
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
                        </ListItem>
                    ))}
                </List>
            </Box>
):(<Box
                sx={{
                    maxHeight: '80vh',
                    overflow: 'auto',
                    borderRadius: '10px',
                    padding: '10px',
                    backgroundColor: theme.palette.quaternary.main
                }}
            >
                <List sx={{ padding: 0 }}>
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
                                    ? theme.palette.text.secondary
                                    : theme.palette.primary.dark,
                                transition: 'background-color 0.3s ease',
                                '&:hover': { bgcolor: theme.palette.ashBlue.main },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent:isMobile ?'start':'space-between',
                                padding: '10px',
                                flexDirection: isMobile ? 'row' : 'row',
                            }}
                        >
                            <ListItemIcon onClick={(e) => {
                                e.stopPropagation(); // Prevent click event from propagating to ListItem
                                toggleTodo(todo.id);
                            }} sx={{ color: 'blue' }}>
                                {todo.completed ? <CheckBox /> : <CheckBoxOutlineBlank />}
                            </ListItemIcon>

                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', marginRight: 4, justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 1 }}>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                        {todo.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                        Due: {new Date(todo.date).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title={todo.description} arrow>
                                        {!isMobile  ?  (<Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                maxWidth: '300px', // Adjusted for mobile view
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {todo.description}
                                        </Typography>):(<Typography sx={{

                                            color:theme.palette.success.main,
                                        }}>Task description</Typography>)}
                                    </Tooltip>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <FormControl sx={{ border: 'none', minWidth: 120, height: 22, flexDirection: 'column', alignItems: 'center' }}>
                                        <FormLabel variant="body2" sx={{ fontSize: '0.875rem', color: theme.palette.text.secondary }}>
                                            Priority
                                        </FormLabel>
                                        <Select
                                            value={todo.priority}
                                            onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
                                            sx={{
                                                border: 'none',
                                                '& .MuiSelect-icon': {
                                                    color: theme.palette.text.primary,
                                                },
                                                backgroundColor: 'white',
                                                borderRadius: '4px',
                                                padding: '0 10px',
                                                height: 22,
                                                fontSize: '0.875rem',
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
                                    <Edit  sx={{ color: theme.palette.error.edit }} />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from propagating to ListItem
                                        deleteTodo(todo.id);
                                    }}
                                    sx={{ color: theme.palette.error.main }}
                                >
                                    <Delete sx={{ color: theme.palette.error.main }} />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
)}
            {/* Modal for Adding Todo */}
            <AddTodoModal
                isMobile={isMobile}
                open={openAddModal}
                onClose={handleCloseAddModal}
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                addTodo={addTodo}
            />

            {/* Modal for Editing Todo */}
            {editingTodo && (
                <EditTodoModal
                    isMobile={isMobile}
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
