import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function QuizzesPage() {
<<<<<<< HEAD
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

<<<<<<< HEAD
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`http://localhost:8080/quizzes/${courseId}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
=======
  async function fetchquizzes() {
    try {
      const response = await fetch(`http://localhost:8080/Quizzes/getByReference/${course_id}`,{
        method:"GET",
        headers:{"Content-Type":"application/json"},
      });
>>>>>>> parent of 3af93cb (Update QuizzesPage.js)

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
=======
    const location = useLocation();
    const user = location.state?.myVariable;
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
                <Button variant="contained" onClick={() => navigate(-1, { state: { myVariable: user } })}>Back</Button>
                <Typography variant="h5">{state.courseName} QUIZZES</Typography>
                <div style={{ width: 48 }} />  {/* Placeholder for spacing */}
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="quizzes table">
>>>>>>> parent of ae5b218 (.)
                    <TableHead>
                        <TableRow>
                            <TableCell>Quiz Title</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
<<<<<<< HEAD
                        {quizzes.map((quiz) => (
<<<<<<< HEAD
                            <TableRow key={quiz.quiz_id}>
                                <TableCell>{quiz.quiz_title}</TableCell>
                                <TableCell align='right'>
                                    <Button variant='contained' onClick={() => navigate('/questions', { state: { quiz_id: quiz.quiz_id } })}>Start Quiz</Button>
=======
=======
                        {sampleQuizzes.map((quiz) => (
>>>>>>> parent of ae5b218 (.)
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.name}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => navigate('/questions', { state: { quizName: quiz.name, courseName: quiz.course }})}>Select</Button>
>>>>>>> parent of 3af93cb (Update QuizzesPage.js)
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
