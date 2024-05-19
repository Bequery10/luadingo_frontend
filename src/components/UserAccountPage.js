import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper } from '@mui/material';

function UserAccountPage() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const response = await fetch(`http://localhost:8080/user/${username}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userDetails = await response.json();
                setUserDetails(userDetails);
                setLoading(false);
            } catch (error) {
                console.error('An error occurred while fetching user details:', error);
                setError(error);
                setLoading(false);
            }
        }

        fetchUserDetails();
    }, [username]);

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/user-list');
        } catch (error) {
            console.error('An error occurred while deleting the user:', error);
        }
    };

    const viewAttempts = () => {
        navigate(`/attempts/${username}`);
    };

    const viewFriends = () => {
        navigate(`/friendsAccounts/${username}`);
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">USER ACCOUNT</Typography>
            {userDetails && (
                <Paper elevation={2} sx={{ padding: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Username: {userDetails.username}</Typography>
                    <Typography variant="h6">Score: {userDetails.score}</Typography>
                    <Box>
                        <Button variant="contained" color="error" onClick={handleDeleteUser}>Delete</Button>
                        <Button variant="contained" onClick={viewAttempts} sx={{ mx: 1 }}>See Attempts</Button>
                        <Button variant="contained" onClick={viewFriends}>Friends</Button>
                    </Box>
                </Paper>
            )}
            {userDetails && (
                <Paper elevation={2} sx={{ padding: 2 }}>
                    <Typography variant="h6">Badges:</Typography>
                    {userDetails.badges && userDetails.badges.map((badge, index) => (
                        <Typography key={index}>{badge}</Typography>
                    ))}
                </Paper>
            )}
        </Box>
    );
}

export default UserAccountPage;

