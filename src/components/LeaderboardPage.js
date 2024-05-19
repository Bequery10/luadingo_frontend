import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function LeaderboardPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const [users1, setusers1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    async function fetchusers1() {
        try {
          const response = await fetch(`http://localhost:8080/user/sort/badge`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const users1 = await response.json();
          return users1;
        } catch (error) {
          console.error('An error occurred while fetching the users1:', error);
          return []; // return an empty array when an error occurs
        }
      }
  
    useEffect(() => {
      async function getusers1() {
        const fetchedusers1 = await fetchusers1();
        setusers1(fetchedusers1);
      }
  
      getusers1();
    }, []);
    

    // const usersWithIndices = users1.map((user, index) => {
    //     return { index, ...user };
    //   });

    //if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;
    let count=0;
    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1, { state: { user: user } })}>Back</Button>
                <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>Leader Board</Typography>
                <Box sx={{ width: 48 }} />  {/* Placeholder for spacing */}
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="leaderboard table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>See Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users1 && users1.map((row,index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{index+1}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.level}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/userProfileForFriends`, { state: { mainUser: user,user: row} })}>See Profile</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default LeaderboardPage;
