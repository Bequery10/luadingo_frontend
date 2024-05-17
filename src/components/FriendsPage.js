import React, { useState } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function FriendsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.myVariable;
    const [open, setOpen] = useState(false);
    
    const sampleFriendsData = [
        { username: 'FriendOne', score: 150 },
        { username: 'FriendTwo', score: 200 },
        { username: 'FriendThree', score: 175 },
        // More sample data can be added here.
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemove = (username) => {
        // Add your remove friend logic here
        console.log(`Remove friend: ${username}`);
    };
    const handleAccept = (username) => {
   
    };
    const handleReject = (username) => {
   
    };


    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">FRIENDS</Typography>
                <Button variant="contained" onClick={handleOpen}>Friend Requests</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="friend-requests-modal-title"
                    aria-describedby="friend-requests-modal-description"
                >
                    {/* You can add your friend requests list here */}
                    <Box sx={{ padding: 2 }}>
    <Typography variant="h6">Friend Requests:</Typography>
    {sampleFriendsData.map((request, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
            <Typography>{request.username}</Typography>
            <Box>
                <Button variant="contained" onClick={() => handleAccept(request.username)}>Accept</Button>
                <Button variant="contained" onClick={() => handleReject(request.username)}>Reject</Button>
            </Box>
        </Box>
    ))}
</Box>
                </Modal>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="friends table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>See Profile</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleFriendsData.map((friend, index) => (
                            <TableRow key={index}>
                                <TableCell>{friend.username}</TableCell>
                                <TableCell>{friend.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => navigate(`/friendsAccounts`, { state: { myVariable: friend.username } })}>
                                        See Profile
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleRemove(friend.username)}>
                                        Remove
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