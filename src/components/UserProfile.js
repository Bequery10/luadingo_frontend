import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const location = useLocation();
<<<<<<< HEAD
    const userId = location.state?.userId;
    const [user, setUser] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function fetchUserDetails() {
        try {
            const response = await fetch(`http://localhost:8080/user/${userId}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error('An error occurred while fetching the user details:', error);
            setSnackbarMessage('Failed to fetch user details.');
        }
    }

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        } else {
            setSnackbarMessage('User ID is missing.');
        }
    }, [userId]);

    // if (!user) {
    //     return (
    //         <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <Typography variant="h6">User data is unavailable. Please go back and try again.</Typography>
    //         </Box>
    //     );
    // }
=======
    const user = location.state?.myVariable;
    const sampleUserData = {
        username: user.username,
        level: user.level,
        badges: ['Gold', 'Silver', 'Bronze' ] // Example badges
    };
>>>>>>> parent of 71e8c39 (nemala)

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => navigate(-1, { state: { myVariable: user } })}>Back</Button>
                <Typography variant="h5">USER PROFILE</Typography>
                <Button variant="contained" onClick={() => navigate('/home', { state: { myVariable: user } })}>Home</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant="h6">{`Username: ${sampleUserData.username}`}</Typography>
                <Button variant="contained" onClick={() => navigate('/friends', { state: { myVariable: user } })}>Friends</Button>
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
