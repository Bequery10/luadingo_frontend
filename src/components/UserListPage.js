import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Dialog, DialogActions, DialogTitle, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserListPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            setUsers(users);
        } catch (error) {
            console.error('An error occurred while fetching users:', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSnackbarMessage('User deleted successfully!');
            setOpenDialog(false);  // Close the dialog
            fetchUsers();  // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete the user:', error);
            setSnackbarMessage('Failed to delete user.');
        }
    };

    const openDeleteDialog = (userId) => {
        setCurrentUserId(userId);
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>USER LIST</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="user list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Delete</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>See Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Button color="error" variant="contained" onClick={() => openDeleteDialog(user.id)}>Delete</Button>
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => navigate('/user-account', { state: { userId: user.id } })}>See Profile</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openDialog}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={() => handleDeleteUser(currentUserId)} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage('')}
                message={snackbarMessage}
            />
        </Box>
    );
}

export default UserListPage;
