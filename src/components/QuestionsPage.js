import React from 'react';
import { Button, Box, Typography, TextField, Paper, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function QuestionsPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const sampleQuestion = {
        courseName: state.courseName,
        questionText: 'What is the correct translation for "Hello"?',
        options: {
            A: 'Hola',
            B: 'Bonjour',
            C: 'Hallo',
            D: '你好'
        },
        answer: state.courseName.includes('Spanish') ? 'A' : state.courseName.includes('French') ? 'B' : state.courseName.includes('German') ? 'C' : 'D'
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">{sampleQuestion.courseName} - Questions</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>Question:</Typography>
                <TextField
                    fullWidth
                    multiline
                    value={sampleQuestion.questionText}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </Paper>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>Choose the correct answer:</Typography>
                <RadioGroup name="quiz-options">
                    {Object.entries(sampleQuestion.options).map(([key, value]) => (
                        <FormControlLabel key={key} value={key} control={<Radio />} label={`${key}: ${value}`} />
                    ))}
                </RadioGroup>
            </Paper>
        </Box>
    );
}

export default QuestionsPage;
