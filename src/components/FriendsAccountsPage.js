import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function FriendsAccountsPage() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFriendDetails() {
            try {
                const response = await fetch(`http://localhost:8080/user/${username}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const friendData = await response.json();
                setFriend(friendData);
            } catch (error) {
                console.error('An error occurred while fetching the friend details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchFriendDetails();
    }, [username]);

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
                <Typography variant="h6" color="error">Failed to load friend details: {error}</Typography>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
            <Typography variant="h5">Friend's Profile</Typography>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">{`Username: ${friend.username}`}</Typography>
                <Typography variant="h6">{`Score: ${friend.score}`}</Typography>
                <Typography variant="h6">{`Email: ${friend.email}`}</Typography>
                {/* Add more friend details as needed */}
            </Paper>
        </Box>
    );
}

export default FriendsAccountsPage;
