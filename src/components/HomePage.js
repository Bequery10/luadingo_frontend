import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate ,useLocation} from 'react-router-dom';
//import ProtectedRoute from './routes/ProtectedRoute';

function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    // Function to handle user logout
    const handleLogout = () => {
        // Here you might also handle clearing any stored authentication tokens or user data
        console.log('Logging out...');
        navigate('/', { replace: true });
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Home Page</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {/* Left Section for Play and Leader Board */}
                <Box sx={{ width: '48%', textAlign: 'center' }}>
                    <Button variant="contained" sx={{ width: '90%', marginBottom: 2 }} onClick={() =>  navigate('/courses', { state: { user: user } })}>Play</Button>
                    <Button variant="contained" sx={{ width: '90%' }} onClick={() =>  navigate('/leaderBoard', { state: { user: user } })}>Leader Board</Button>
                </Box>

                {/* Right Section for Logout, Profile, Settings */}
                <Box sx={{ width: '48%', textAlign: 'center' }}>
                    <Button variant="contained" sx={{ width: '90%', marginBottom: 2 }} onClick={handleLogout}>Logout</Button>
                    <Button variant="contained" sx={{ width: '90%', marginBottom: 2 }} onClick={() =>  navigate(`/user/${user.username}`, { state: { user: user } })}>Profile</Button>
                    <Button variant="contained" sx={{ width: '90%' }} onClick={() =>  navigate('/settings', { state: { user: user } })}>Settings</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;
