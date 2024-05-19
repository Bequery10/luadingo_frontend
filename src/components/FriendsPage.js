import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function FriendsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

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
   
   

    const [fRequests, setfRequests] = useState([]);

 async function fetchfRequests() {
   try {
     const response = await fetch(`http://localhost:8080/Friends_With/requests/${user.username}`,{
       method:"GET",
       headers:{"Content-Type":"application/json"},
     });

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }

     const fRequests = await response.json();
     return fRequests;
   } catch (error) {
     console.error('An error occurred while fetching the fRequests:', error);
   }
 }

 useEffect(() => {
   async function getfRequests() {
     const fetchedfRequests = await fetchfRequests();
     setfRequests(fetchedfRequests);
   }

   getfRequests();
   
 }, []);




 async function handleAccept(username) {
  try {
      const response = await fetch(`http://localhost:8080/Friends_With/accept/${user.username}/${username}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
          const errorData = await response.json(); // Try to extract more error info from the server response
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || ''}`);
      }

      // Update the fRequests state by removing the accepted request
      setfRequests((prevRequests) => prevRequests.filter((request) => request.username !== username));
  } catch (error) {
      console.error('An error occurred while accepting the friend request:', error);
  }
}
    

    async function handleDeny(username) {
      try {
        const response = await fetch(`http://localhost:8080/Friends_With/delete/${user.username}/${username}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Update the fRequests state by removing the denied request
        setfRequests((prevRequests) => prevRequests.filter((request) => request.username !== username));
      } catch (error) {
        console.error('An error occurred while denying the friend request:', error);
      }
    }

    // useEffect(() => {
    //   async function getFriends() {
    //     const fetchedFriends = await fetchFriends();
    //     setFriends(fetchedFriends);
    //   }

    //   getFriends();
    //   fetchfRequests();
    // }, []);

    if (error) return <Typography>Error: {error}</Typography>;

    return (
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
          <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
          <Button variant="contained" onClick={() => setOpen(true)}>Friend Requests</Button>
        </Box>
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
              {friends.map((friend,index1) => (
                <TableRow key={index1}>
                  <TableCell>{friend.username}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => navigate(`/user/${friend.username}`, { state: { mainUser: user,user: friend } })}>View Profile</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Friend Requests</Typography>
            {fRequests.map((request, index) => (
              <Box key={index}>
                <Typography>{`\n${request.username1}`}</Typography>
                <Button variant="contained" onClick={() => handleAccept(request.username)}>Accept</Button>
                <Button variant="contained" onClick={() => handleDeny(request.username)}>Deny</Button>
              </Box>
            ))}
          </Box>
        </Modal>
      </Box>
    );
}

export default FriendsPage;