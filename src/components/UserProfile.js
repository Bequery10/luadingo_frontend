import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function UserProfile() {
   
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    
 const [badges, setbadges] = useState([]);

 async function fetchbadges() {
   try {
     const response = await fetch(`http://localhost:8080/Has_Badge/getBadges/${user.username}`,{
       method:"GET",
       headers:{"Content-Type":"application/json"},
     });

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }

     const badges = await response.json();
     return badges;
   } catch (error) {
     console.error('An error occurred while fetching the badges:', error);
   }
 }

 useEffect(() => {
   async function getbadges() {
     const fetchedbadges = await fetchbadges();
     setbadges(fetchedbadges);
   }

   getbadges();
 }, []);
    
    const sampleUserData = {
        username: user.username,
        level: user.level,
        badges: badges
    };



    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1, { state: { user: user } })}>Back</Button>
                <Typography variant="h5">USER PROFILE</Typography>
                <Button variant="contained" onClick={() => navigate('/home', { state: { user: user } })}>Home</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant="h6">{`Username: ${sampleUserData.username}`}</Typography>
                <Button variant="contained" onClick={() => navigate('/friends', { state: { user: user } })}>Friends</Button>
            </Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>{`level: ${sampleUserData.level}`}</Typography>
            <Typography variant="h6">Badges:</Typography>
            <Paper variant="outlined" sx={{ padding: 2, display: 'flex', justifyContent: 'space-around' }}>
                {sampleUserData.badges.map(badge => (
                    <Typography key={badge}>{badge}</Typography>
                ))}
            </Paper>
        </Box>
    );
}

export default UserProfile;
