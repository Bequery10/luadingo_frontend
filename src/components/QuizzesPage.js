import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function QuizzesPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const sampleQuizzes = [
        { id: 1, name: 'Basics Quiz', course: 'French for Beginners' },
        { id: 2, name: 'Vocabulary Builder', course: 'Spanish Essentials' },
        { id: 3, name: 'Grammar and Usage', course: 'German: Intermediate' },
        { id: 4, name: 'Pronunciation Practice', course: 'Mandarin Chinese Basics' },
        { id: 5, name: 'Useful Phrases', course: 'Japanese for Travel' },
    ].filter(quiz => quiz.course === state.courseName);

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">{state.courseName} QUIZZES</Typography>
                <div style={{ width: 48 }} />  {/* Placeholder for spacing */}
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="quizzes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Quiz Name</TableCell>
                            <TableCell align="right">Select</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleQuizzes.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.name}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => navigate('/questions', { state: { quizName: quiz.name, courseName: quiz.course }})}>Select</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default QuizzesPage;

