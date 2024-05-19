import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function SettingsPage() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const user = useLocation.state?.user;

    const handleUsernameChange = (e) => {
        e.preventDefault()
        const updatedUser = { username:newUsername, password:user.password};
        fetch(`http://localhost:8080/user/update/${user.username}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(updatedUser)
    
      }).then(()=>{
        alert("username has successfully changed");
        setTimeout(() => {
            navigate('/');
          }, 200);

      })
    };

    const handlePasswordChange = (e) => {
        e.preventDefault()
        const updatedUser = { username: user.username, password:newPassword};
        fetch(`http://localhost:8080/user/update/${user.username}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(updatedUser)
    
      }).then(()=>{
        alert("password has successfully changed");
        setTimeout(() => {
            navigate('/');
          }, 200);
      })
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

