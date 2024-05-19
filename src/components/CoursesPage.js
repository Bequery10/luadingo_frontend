import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';

function CoursesPage() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = useLocation.state?.user;
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:8080/Course/getAll', {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }

                const courses = await response.json();
                setCourses(courses);
            } catch (error) {
                console.error('An error occurred while fetching the courses:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant='h4' sx={{ marginBottom: 2 }}>Courses</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course Name</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.course_id}>
                                <TableCell>{course.course_name}</TableCell>
                                <TableCell align='right'>
                                    <Button variant='contained' onClick={() => navigate('/quizzes', { state: {user:user,course: course } })}>View Quizzes</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CoursesPage;
