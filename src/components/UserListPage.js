import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function UserListPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchUsers() {
        try {
            const response = await fetch(`http://localhost:8080/user/getAll`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            setUsers(users);
            setLoading(false);
        } catch (error) {
            console.error('An error occurred while fetching the users:', error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/user/${username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setUsers(users.filter(user => user.username !== username));
        } catch (error) {
            console.error('An error occurred while deleting the user:', error);
            setError(error);
        }
    };

    const viewUserProfile = (username) => {
        navigate(`/user-account/${username}`); // Navigate to the correct path with URL parameters
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>USER LIST</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="user list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Delete</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>See Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.username}>
                                <TableCell>
                                    <Button color="error" variant="contained" onClick={() => handleDeleteUser(user.username)}>Delete</Button>
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.score}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => viewUserProfile(user.username)}>See Profile</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UserListPage;
