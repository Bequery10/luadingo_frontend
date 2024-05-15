import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const sampleUserData = {
        username: 'JohnDoe',
        score: 1200,
        badges: ['Gold', 'Silver', 'Bronze'] // Example badges
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">USER PROFILE</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant="h6">{`Username: ${sampleUserData.username}`}</Typography>
                <Button variant="contained" onClick={() => navigate('/friends')}>Friends</Button>
            </Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>{`Score: ${sampleUserData.score}`}</Typography>
            <Typography variant="h6">Badges:</Typography>
            <Paper variant="outlined" sx={{ padding: 2, display: 'flex', justifyContent: 'space-around' }}>
                {sampleUserData.badges.map(badge => (
                    <Typography key={badge}>{badge}</Typography>
                ))}
            </Paper>
        </Box>
    );
}

export default UserProfile;
