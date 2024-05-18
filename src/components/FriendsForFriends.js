import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function FriendsForFriendsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.myVariable;
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function fetchFriends() {
        try {
            const response = await fetch(`http://localhost:8080/friends/${user.username}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const friendsData = await response.json();
            setFriends(friendsData.friends);
            setFriendRequests(friendsData.friendRequests);
        } catch (error) {
            console.error('An error occurred while fetching the friends:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFriends();
    }, [user.username]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="error">Failed to load friends: {error}</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
        );
    }

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
                    <Box sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: 400, 
                        bgcolor: 'background.paper', 
                        boxShadow: 24, 
                        p: 4 
                    }}>
                        <Typography id="friend-requests-modal-title" variant="h6" component="h2">
                            Friend Requests
                        </Typography>
                        {friendRequests.length > 0 ? (
                            friendRequests.map((request, index) => (
                                <Typography key={index}>{request.username}</Typography>
                            ))
                        ) : (
                            <Typography id="friend-requests-modal-description" sx={{ mt: 2 }}>
                                No friend requests at this moment.
                            </Typography>
                        )}
                        <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {friends.map((friend, index) => (
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

export default FriendsForFriendsPage;
