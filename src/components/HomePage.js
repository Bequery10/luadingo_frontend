import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    // Function to handle user logout
    const handleLogout = () => {
        // Here you might also handle clearing any stored authentication tokens or user data
        console.log('Logging out...');
        navigate('/login'); // Navigate to the login page after logout
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Home Page</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {/* Left Section for Play and Leader Board */}
                <Box sx={{ width: '48%', textAlign: 'center' }}>
                    <Button variant="contained" sx={{ width: '90%', marginBottom: 2 }} onClick={() => navigate('/courses')}>Play</Button>
                    <Button variant="contained" sx={{ width: '90%' }} onClick={() => navigate('/leaderboard')}>Leader Board</Button>
                </Box>

                {/* Right Section for Logout, Profile, Settings */}
                <Box sx={{ width: '48%', textAlign: 'center' }}>
                    <Button variant="contained" sx={{ width: '90%', marginBottom: 2 }} onClick={handleLogout}>Logout</Button>
                    <Button variant="contained" sx={{ width: '90%', marginBottom: 2 }} onClick={() => navigate('/user/JohnDoe')}>Profile</Button>
                    <Button variant="contained" sx={{ width: '90%' }} onClick={() => navigate('/settings')}>Settings</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;
