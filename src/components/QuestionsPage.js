import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TextField, Paper, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function QuestionsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const location1 = useLocation();
    const quiz = location1.state?.quiz;
    const location2 = useLocation();
    const course = location2.state?.course;
    const [isLoading, setIsLoading] = useState(true);
    //const [questionsWithOptions, setQuestionsWithOptions] = useState([]);
    const [answers, setAnswers] = useState({}); // To store user's answers
    const [score, setScore] = useState(0); // To store the score

    const { state } = useLocation();

    const [questionsWithOptions, setQuestionsWithOptions] = useState([]);

    useEffect(() => {   
        async function fetchQuestionsAndOptions() {
            // Fetch questions
            const questionsResponse = await fetch(`http://localhost:8080/Has_Question/questions/${quiz.quiz_id}`, {
                method: "GET",
            headers: { "Content-Type": "application/json" }
            });
             const questions = await questionsResponse.json();
    
            // Fetch options for each question
            const fetchedQuestionsWithOptions = await Promise.all(questions.map(async (question) => {
                const optionsResponse = await fetch(`http://localhost:8080/Has_Options/${question.question_id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
            });
             const options = await optionsResponse.json();
    
                // Return question with its options
                return { ...question, options };
            }));
    
            setQuestionsWithOptions(fetchedQuestionsWithOptions);
        }
    
        if (quiz && quiz.quiz_id) {
            fetchQuestionsAndOptions();
        }
    }, [quiz]);
    console.log(JSON.stringify(questionsWithOptions, null, 2));
    const optionLetters = ['A', 'B', 'C', 'D'];
    
    let sampleQuestions = [];

if (course && questionsWithOptions) {
    sampleQuestions = questionsWithOptions.map((question) => {
        return {
            question_id:question.question_id,
            courseName:  course.course_name,
            questionText: question.question_text, // replace 'question_text' with the actual property name
            answer: question.question_answer,

            options: question.options.reduce((acc, option, index) => {
                acc[optionLetters[index]] = option.choice;
                return acc;
            }, {})
        };
    });
}
    if (isLoading) {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2000 milliseconds = 2 seconds
        return <div>Loading...</div>;
    }

    const handleAnswerChange = (questionId, event) => {
        let index = questionId - sampleQuestions[0].question_id;
        setAnswers({
            ...answers,
            [questionId]: sampleQuestions[index].options[event.target.value]
        });
    };

    const handleSubmit = () => {
        let score = 0;
        sampleQuestions.forEach((question) => {
            console.log(answers[question.question_id]);
            console.log(question.answer);
            if (answers[question.question_id] === question.answer) {
                score += 1;
            }
        });
        setScore(score);

        const attempt={
            attempt_current:score,
            attempt_score:score*100,
        }
        
    const saveAttempt = async () => {

        const attemptResponse = await fetch(`http://localhost:8080/Attempt/add/${user.username}/${quiz.quiz_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attempt)
        });
        const num = await attemptResponse.json();
       
        if(num==2 || num==3) alert(`YOU WON A BADGE! \n check your profile`);
        else if(num==0) alert(`something went wrong`);

        setTimeout(() => {
            navigate(-1);
        }, 1000);
    };

    saveAttempt();
    
}

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">{sampleQuestions[0].courseName} - Questions</Typography>
                <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
            </Box>
            {sampleQuestions.map((question, index) => (
                <React.Fragment key={index}>
                    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>Question:</Typography>
                        <TextField
                            fullWidth
                            multiline
                            value={question.questionText}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Paper>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>Choose the correct answer:</Typography>
                        <RadioGroup name={`quiz-options-${index}`} onChange={(event) => handleAnswerChange(question.question_id, event)}>
                            {Object.entries(question.options).map(([key, value]) => (
                                <FormControlLabel key={key} value={key} control={<Radio />} label={`${key}: ${value}`} />
                            ))}
                        </RadioGroup>
                    </Paper>
                </React.Fragment>
            ))}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Typography variant="h6">Score: {score}</Typography>
        </Box>
    );
}

export default QuestionsPage;