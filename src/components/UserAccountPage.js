import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, Snackbar, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function UserAccountPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userId } = state; // Assuming userId is passed via router state

    const [user, setUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('An error occurred while fetching the user details:', error);
                setSnackbarMessage('Failed to fetch user details.');
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    // Handle delete user
    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${userId}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSnackbarMessage('User deleted successfully!');
            navigate('/user-list'); // Navigate back to the user list after deletion
        } catch (error) {
            console.error('Failed to delete the user:', error);
            setSnackbarMessage('Failed to delete user.');
        } finally {
            setOpenDialog(false); // Ensure the dialog is closed after the operation
        }
    };

    if (!user) {
        return (
            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">User data is unavailable. Please go back and try again.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">USER ACCOUNT</Typography>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Username: {user.username}</Typography>
                <Typography variant="h6">Score: {user.score}</Typography>
                <Box>
                    <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>Delete</Button>
                    <Button variant="contained" onClick={() => console.log('Viewing attempts...')} sx={{ mx: 1 }}>See Attempts</Button>
                    <Button variant="contained" onClick={() => navigate('/friends', { state: { userId } })}>Friends</Button>
                </Box>
            </Paper>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h6">Badges:</Typography>
                {user.badges && user.badges.map((badge, index) => (
                    <Typography key={index}>{badge}</Typography>
                ))}
            </Paper>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteUser} color="error" autoFocus>Delete</Button>
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

export default UserAccountPage;
