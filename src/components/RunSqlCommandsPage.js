import React, { useState } from 'react';
import { Button, Box, TextField, Typography, Paper, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function RunSqlCommandsPage() {
    const navigate = useNavigate();
    const [sqlCommand, setSqlCommand] = useState('');
    const [results, setResults] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Function to handle running SQL commands via an API
    const handleRunSqlCommand = async () => {
        console.log('Running SQL Command:', sqlCommand);
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/run-sql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sqlCommand })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setResults(data.result); // Assuming the backend sends back a 'result' key with the SQL execution result
        } catch (error) {
            console.error('Failed to run SQL command:', error);
            setSnackbarMessage(`Failed to execute command: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant="h4">RUN SQL COMMANDS</Typography>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
            </Box>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>Run SQL Commands</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter SQL command here"
                    value={sqlCommand}
                    onChange={(e) => setSqlCommand(e.target.value)}
                    variant="outlined"
                    disabled={isLoading}
                />
                <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleRunSqlCommand} disabled={isLoading}>
                    Execute
                </Button>
            </Paper>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>Results</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={results}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    placeholder="Results will appear here"
                />
            </Paper>
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage('')}
                message={snackbarMessage}
            />
        </Box>
    );
}

export default RunSqlCommandsPage;
