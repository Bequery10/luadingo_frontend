import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function QuizzesPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = useLocation.state?.user;
    const course = useLocation.state?.course;

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`http://localhost:8080/Has_Quiz/quizzes/${course.course_id}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch quizzes');
                }

                const quizzes = await response.json();
                setQuizzes(quizzes);
            } catch (error) {
                console.error('An error occurred while fetching the quizzes:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [courseId]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant='h4' sx={{ marginBottom: 2 }}>Quizzes</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Quiz Title</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizzes.map((quiz) => (
                            <TableRow key={quiz.quiz_id}>
                                <TableCell>{quiz.quiz_title}</TableCell>
                                <TableCell align='right'>
                                    <Button variant='contained' onClick={() => navigate('/questions', { state: { user: user, quiz: quiz} })}>Start Quiz</Button>
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
