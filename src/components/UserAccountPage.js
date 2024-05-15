import React from 'react';
import { Button, Box, Typography, Paper, useNavigate, useLocation } from '@mui/material';

function UserAccountPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userId } = state;
    // Fetch user details using userId or pass user details through state

    const handleDeleteUser = () => {
        console.log('Deleting user...');
        // Implement actual deletion logic
    };

    const viewAttempts = () => {
        console.log('Viewing attempts...');
        // Implement actual viewing logic
    };

    const viewFriends = () => {
        console.log('Viewing friends...');
        // navigate('/friends'); Uncomment and implement as needed
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">USER ACCOUNT</Typography>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Username: JohnDoe</Typography> {/* Replace with actual data */}
                <Typography variant="h6">Score: 1230</Typography> {/* Replace with actual data */}
                <Box>
                    <Button variant="contained" color="error" onClick={handleDeleteUser}>Delete</Button>
                    <Button variant="contained" onClick={viewAttempts} sx={{ mx: 1 }}>See Attempts</Button>
                    <Button variant="contained" onClick={viewFriends}>Friends</Button>
                </Box>
            </Paper>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h6">Badges:</Typography>
                {/* Map through badges or other user-specific data */}
                <Typography>Gold</Typography>
                <Typography>Silver</Typography>
                <Typography>Bronze</Typography>
            </Paper>
        </Box>
    );
}

export default UserAccountPage;
