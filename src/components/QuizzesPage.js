import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function QuizzesPage() {
    const location = useLocation();
    const user = location.state?.myVariable;
    const course_id=location.state?.course_id;
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quizzes, setquizzes] = useState([]);

  async function fetchquizzes() {
    try {
      const response = await fetch(`http://localhost:8080/Quizzes/getAll`,{
        method:"GET",
        headers:{"Content-Type":"application/json"},
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const quizzes = await response.json();
      return quizzes;
    } catch (error) {
      console.error('An error occurred while fetching the quizzes:', error);
    }
  }

  useEffect(() => {
    async function getquizzes() {
      const fetchedquizzes = await fetchquizzes();
      setquizzes(fetchedquizzes);
    }

    getquizzes();
  }, []);

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
                        {quizzes.map((quiz) => (
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

