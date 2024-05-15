import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = () => {
        console.log('Change Username to:', newUsername);
    };

    const handlePasswordChange = () => {
        console.log('Change Password to:', newPassword);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>SETTINGS</Typography>
                <Box sx={{ width: 48 }} />  {/* Placeholder for symmetry */}
            </Box>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    label="New username:"
                    variant="outlined"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" onClick={handleUsernameChange}>Change Username</Button>
                <TextField
                    label="New password:"
                    variant="outlined"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <Button variant="contained" onClick={handlePasswordChange} sx={{ marginTop: 1 }}>Change Password</Button>
            </Box>
        </Box>
    );
}

export default SettingsPage;

