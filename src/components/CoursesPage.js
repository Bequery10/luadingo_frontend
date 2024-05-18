import React from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CoursesPage() {
    const navigate = useNavigate();
<<<<<<< HEAD
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
=======
    const location = useLocation();
    const user = location.state?.myVariable;

    async function fetchCourses() {
        try {
          const response = await fetch(`http://localhost:8080/has_course/get/${user.username}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            //body:JSON.stringify(username)
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const courses = await response.json();
          return courses;
        } catch (error) {
          console.error('An error occurred while fetching the badges:', error);
          return [];
        }
      }
      
      const courses = fetchCourses();

      function fillCourses1(){
        var Courses1 = [];
        for(var i=0;i<courses.length;i++){
            Courses1[i]={id:i+1, name: courses[i].name}
        }
        return Courses1;
    }
    
    const Courses1 = fillCourses1();
    
    // const Courses1 = [
    //     { id: 1, name: 'French for Beginners' },
    //     { id: 2, name: 'Spanish Essentials' },
    //     { id: 3, name: 'German: Intermediate' },
    //     { id: 4, name: 'Mandarin Chinese Basics' },
    //     { id: 5, name: 'Japanese for Travel' },
    //     { id: 6, name: 'French for Beginners' },
    //     { id: 7, name: 'Spanish Essentials' },
    //     { id: 8, name: 'German: Intermediate' },
    //     { id: 9, name: 'Mandarin Chinese Basics' },
    //     { id: 10, name: 'Japanese for Travel' },
    //     { id: 11, name: 'French for Beginners' },
    //     { id: 12, name: 'Spanish Essentials' },
    //     { id: 13, name: 'German: Intermediate' },
    //     { id: 14, name: 'Mandarin Chinese Basics' },
    //     { id: 15, name: 'Japanese for Travel' },
    //     { id: 16, name: 'French for Beginners' },
    //     { id: 17, name: 'Spanish Essentials' },
    //     { id: 18, name: 'German: Intermediate' },
    //     { id: 19, name: 'Mandarin Chinese Basics' },
    //     { id: 20, name: 'Japanese for Travel' }

    // ];

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
                    {Courses1.map((course) => (
                        <TableRow key={course.id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" onClick={() => navigate('/home', { state: { myVariable: user } })}>Select</Button>
                            </TableCell>
>>>>>>> parent of ae5b218 (.)
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.course_id}>
                                <TableCell>{course.course_name}</TableCell>
                                <TableCell align='right'>
                                    <Button variant='contained' onClick={() => navigate('/quizzes', { state: { courseID: course.course_id } })}>View Quizzes</Button>
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
