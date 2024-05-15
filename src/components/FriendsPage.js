import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FriendsPage() {
    const navigate = useNavigate();
    const sampleFriendsData = [
        { username: 'FriendOne', score: 150 },
        { username: 'FriendTwo', score: 200 },
        { username: 'FriendThree', score: 175 },
        // More sample data can be added here.
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">FRIENDS</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="friends table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>See Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleFriendsData.map((friend, index) => (
                            <TableRow key={index}>
                                <TableCell>{friend.username}</TableCell>
                                <TableCell>{friend.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => navigate(`/user/${friend.username}`)}>
                                        See Profile
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default FriendsPage;
