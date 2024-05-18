import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, CircularProgress, FormControlLabel, Radio, RadioGroup, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function QuestionsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.myVariable;
    const quizID = location.state?.quizID;
    const quizName = location.state?.quizName;
    const courseName = location.state?.courseName;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function fetchQuestions() {
        try {
            const response = await fetch(`http://localhost:8080/questions/getByQuiz/${quizID}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const questions = await response.json();
            return questions;
        } catch (error) {
            console.error('An error occurred while fetching the questions:', error);
            setError(error.message);
        }
    }

    useEffect(() => {
        async function getQuestions() {
            const fetchedQuestions = await fetchQuestions();
            if (fetchedQuestions) {
                setQuestions(fetchedQuestions);
            }
            setLoading(false);
        }

        getQuestions();
    }, [quizID]);

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
                <Typography variant="h6" color="error">Failed to load questions: {error}</Typography>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">{courseName} - {quizName} Questions</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            {questions.map((question, index) => (
                <Paper key={index} elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>Question:</Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>{question.question_text}</Typography>
                    <RadioGroup name={`question-${index}`}>
                        {question.options.map((option, idx) => (
                            <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                </Paper>
            ))}
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage('')}
                message={snackbarMessage}
            />
        </Box>
    );
}

export default QuestionsPage;
