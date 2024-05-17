import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function CoursesPage() {
    const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.myVariable;
  const [courses, setCourses] = useState([]);

  async function fetchCourses() {
    try {
      const response = await fetch(`http://localhost:8080/Course/getAll`,{
        method:"GET",
        headers:{"Content-Type":"application/json"},
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const courses = await response.json();
      return courses;
    } catch (error) {
      console.error('An error occurred while fetching the courses:', error);
    }
  }

  useEffect(() => {
    async function getCourses() {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);
    }

    getCourses();
  }, []);

    return (
        <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Button variant="contained" onClick={() => navigate('/home', { state: { myVariable: user } })}>Back</Button>
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
                    {courses.map((course) => (
                        <TableRow key={course.course_id}>
                            <TableCell>{`${course.course_name}`}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" onClick={() => navigate('/quizzes', { state: { myVariable: user, courseID:course.course_id } })}>Select</Button>
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
