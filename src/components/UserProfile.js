import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const [user, setUser] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function fetchUserDetails() {
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
    }

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        } else {
            setSnackbarMessage('User ID is missing.');
        }
    }, [userId]);

    // if (!user) {
    //     return (
    //         <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <Typography variant="h6">User data is unavailable. Please go back and try again.</Typography>
    //         </Box>
    //     );
    // }

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">USER PROFILE</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">{`Username: ${user.username}`}</Typography>
                <Typography variant="h6">{`Level: ${user.level}`}</Typography>
                <Typography variant="h6">Badges:</Typography>
                {user.badges && user.badges.map((badge, index) => (
                    <Typography key={index}>{badge}</Typography>
                ))}
            </Paper>
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage('')}
                message={snackbarMessage}
            />
        </Box>
    );
}

export default UserProfile;

