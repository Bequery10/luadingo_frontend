import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CoursesPage() {
    const navigate = useNavigate();
    const sampleCourses = [
        { id: 1, name: 'French for Beginners' },
        { id: 2, name: 'Spanish Essentials' },
        { id: 3, name: 'German: Intermediate' },
        { id: 4, name: 'Mandarin Chinese Basics' },
        { id: 5, name: 'Japanese for Travel' },
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
                <Typography variant="h5">LANGUAGE COURSES</Typography>
                <div style={{ width: 48 }} />  {/* Placeholder for spacing */}
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="courses table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Course Name</TableCell>
                            <TableCell align="right">Select</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => navigate('/quizzes', { state: { courseName: course.name }})}>Select</Button>
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
