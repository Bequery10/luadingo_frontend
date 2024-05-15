import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Correct import

function AdminPage() {
    const navigate = useNavigate(); // Utilizing useNavigate for routing

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/login'); // Navigates to login page upon logout
    };

    const manageUsers = () => {
        navigate('/user-list'); // Navigates to user management page
    };

    const runSqlCommands = () => {
        navigate('/sql-commands'); // Navigates to SQL commands page
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ flexGrow: 1, marginRight: 'auto' }}>ADMIN PAGE</Typography>
            <Button variant="contained" color="error" onClick={handleLogout} sx={{ position: 'absolute', right: 20, top: 20 }}>
                Logout
            </Button>
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" onClick={manageUsers}>Manage Users</Button>
                <Button variant="contained" onClick={runSqlCommands}>Run SQL Commands</Button>
            </Box>
        </Box>
    );
}

export default AdminPage;
