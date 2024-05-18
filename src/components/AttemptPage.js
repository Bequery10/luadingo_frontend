import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AttemptPage() {
    const navigate = useNavigate();
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchAttempts() {
        try {
            const response = await fetch('http://localhost:8080/attempts', {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const attemptsData = await response.json();
            setAttempts(attemptsData);
        } catch (error) {
            console.error('An error occurred while fetching the attempts:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAttempts();
    }, []);

    const handleClarification = (attemptId) => {
        console.log(`Clarifying attempt ID: ${attemptId}`);
        // Implement actual clarification logic here
    };

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
                <Typography variant="h6" color="error">Failed to load attempts: {error}</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h4">ATTEMPTS</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="attempts table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Attempt ID</TableCell>
                            <TableCell>Time Stamp</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Clarify</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attempts.map((attempt) => (
                            <TableRow key={attempt.attempt_id}>
                                <TableCell>{attempt.attempt_id}</TableCell>
                                <TableCell>{attempt.attempt_timestamp}</TableCell>
                                <TableCell>{attempt.attempt_score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleClarification(attempt.attempt_id)}>
                                        Clarify
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

export default AttemptPage;
