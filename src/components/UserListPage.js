import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserListPage() {
    const navigate = useNavigate();
    const sampleUsers = [
        { id: 1, username: 'UserOne', score: 100 },
        { id: 2, username: 'UserTwo', score: 200 },
        { id: 3, username: 'UserThree', score: 300 },
    ];

    const handleDeleteUser = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
    };

    const viewUserProfile = (userId) => {
        navigate('/user-account', { state: { userId } });
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
                        {sampleUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Button color="error" variant="contained" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => viewUserProfile(user.id)}>See Profile</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UserListPage;
