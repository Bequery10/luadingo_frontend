import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function LeaderboardPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.myVariable;
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchLeaderboard() {
        try {
            const response = await fetch('http://localhost:8080/leaderboard', {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setLeaderboardData(data);
        } catch (error) {
            console.error('An error occurred while fetching the leaderboard:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLeaderboard();
    }, []);

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
                <Typography variant="h6" color="error">Failed to load leaderboard: {error}</Typography>
                <Button variant="contained" onClick={() => navigate('/home', { state: { myVariable: user } })}>Home</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1, { state: { myVariable: user } })}>Back</Button>
                <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>Leader Board</Typography>
                <Box sx={{ width: 48 }} />  {/* Placeholder for spacing */}
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="leaderboard table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>See Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.score}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/friendsAccounts`, { state: { myVariable: {username: row.username, score: row.score} } })}>See Profile</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default LeaderboardPage;
