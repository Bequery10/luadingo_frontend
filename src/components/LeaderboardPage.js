import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function LeaderboardPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.myVariable;
    const [sampleData, setSampleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            try {
                setSampleData([
                    { index: 1, username: 'UserOne', score: 300 },
                    { index: 2, username: 'UserTwo', score: 250 },
                    { index: 3, username: 'UserThree', score: 200 },
                    // Add more sample data as needed
                ]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }, 1000);
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

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
                        {sampleData.map((row) => (
                            <TableRow key={row.index}>
                                <TableCell component="th" scope="row">{row.index}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.score}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/user/${row.username}`, { state: { myVariable: row.username } })}>See Profile</Button>
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
