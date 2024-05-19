import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function FriendsAccountsPage() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { username } = useParams(); // Use useParams to get the username from the URL

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const resFriends = await fetch(`http://localhost:8080/Friends_With/friends/${username}`);
                const friendsData = await resFriends.json();

                if (!resFriends.ok) {
                    throw new Error('Failed to fetch data');
                }

                setFriends(friendsData);
            } catch (error) {
                setError('Failed to fetch friends.');
                console.error('Error:', error);
            }
            setLoading(false);
        };

        fetchFriends();
    }, [username]);

    const handleNavigate = (friendUsername) => {
        navigate(`/friend-profile/${friendUsername}`, { state: { username } });
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h4">FRIENDS ACCOUNTS</Typography>
                <Button variant="contained" onClick={() => navigate('/home', { state: { username } })}>Home</Button>
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
                        {friends.map((friend) => (
                            <TableRow key={friend.username}>
                                <TableCell>{friend.username}</TableCell>
                                <TableCell>{friend.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleNavigate(friend.username)}>
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
