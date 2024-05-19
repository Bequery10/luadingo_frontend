import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';  // Make sure to import useLocation if you are using it

function AdminPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/');  // Navigate to the root path if that's your login page
    };

    const manageUsers = () => {
        navigate('/user-list');
    };

    const runSqlCommands = () => {
        navigate('/sql-commands');
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
