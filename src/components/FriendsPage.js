import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FriendsPage() {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch('http://localhost:8080/friends', {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch friends');
                }

                const friendsData = await response.json();
                setFriends(friendsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Friends</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Friend's Username</TableCell>
                            <TableCell align="right">Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {friends.map((friend) => (
                            <TableRow key={friend.username}>
                                <TableCell>{friend.username}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => navigate(`/user/${friend.username}`)}>View Profile</Button>
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
