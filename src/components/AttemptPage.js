import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AttemptPage() {
    const navigate = useNavigate();
    const sampleAttempts = [
        { id: 1, timestamp: '2024-05-14 08:00', score: 85, clarification: 'Clarify' },
        { id: 2, timestamp: '2024-05-13 12:00', score: 90, clarification: 'Clarify' },
        { id: 3, timestamp: '2024-05-12 16:00', score: 88, clarification: 'Clarify' },
        // More sample data can be populated here.
    ];

    const handleClarification = (attemptId) => {
        console.log(`Clarifying attempt ID: ${attemptId}`);
        // Implement actual clarification logic here
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h4">ATTEMPT</Typography>
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
                        {sampleAttempts.map((attempt) => (
                            <TableRow key={attempt.id}>
                                <TableCell>{attempt.id}</TableCell>
                                <TableCell>{attempt.timestamp}</TableCell>
                                <TableCell>{attempt.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleClarification(attempt.id)}>
                                        {attempt.clarification}
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
