import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FriendsAccountsPage() {
    const navigate = useNavigate();
    const sampleFriends = [
        { id: 1, username: 'FriendOne', score: 150 },
        { id: 2, username: 'FriendTwo', score: 175 },
        { id: 3, username: 'FriendThree', score: 200 },
        // Additional friend data can be populated here.
    ];

    const viewFriendProfile = (friendId) => {
        console.log(`Viewing profile for friend ID: ${friendId}`);
        // Here you would navigate to the friend's profile page
        // navigate(`/friends-profile/${friendId}`);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h4">FRIENDS ACCOUNTS</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="friends accounts table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>See Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleFriends.map((friend) => (
                            <TableRow key={friend.id}>
                                <TableCell>{friend.username}</TableCell>
                                <TableCell>{friend.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => viewFriendProfile(friend.id)}>
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

export default FriendsAccountsPage;
