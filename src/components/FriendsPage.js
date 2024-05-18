import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';

function FriendsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  
 const [friends, setfriends] = useState([]);

 async function fetchfriends() {
   try {
     const response = await fetch(`http://localhost:8080/Friends_With/friends/${user.username}`,{
       method:"GET",
       headers:{"Content-Type":"application/json"},
     });

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }

     const friends = await response.json();
     return friends;
   } catch (error) {
     console.error('An error occurred while fetching the friends:', error);
   }
 }

 useEffect(() => {
   async function getfriends() {
     const fetchedfriends = await fetchfriends();
     setfriends(fetchedfriends);
   }

   getfriends();
 }, []);

   // if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Friends</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Friend's Username</TableCell>
                            <TableCell align="right">Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {friends.map((friend) => (
                            <TableRow key={friend.username}>
                                <TableCell>{friend.username}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => navigate(`/user/${friend.username}`, { state: { user: friend } })}>View Profile</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default FriendsPage;
