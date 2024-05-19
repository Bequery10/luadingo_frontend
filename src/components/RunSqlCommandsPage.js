import React, { useState } from 'react';
import { Button, Box, TextField, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function RunSqlCommandsPage() {
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate();
    const [sqlCommand, setSqlCommand] = useState('');
    const [results, setResults] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchSqlCommand(sql) {
        try {
            const response = await fetch(`http://localhost:8080/run-sql-command`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sql }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('An error occurred while running the SQL command:', error);
            return { error: error.message };
        }
    }

    const handleRunSqlCommand = async () => {
        setLoading(true);
        setError(null);
        const result = await fetchSqlCommand(sqlCommand);
        if (result.error) {
            setError(result.error);
            setResults('');
        } else {
            setResults(JSON.stringify(result.result, null, 2));
        }
        setLoading(false);
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
                    placeholder="Enter SQL command here"
                    value={sqlCommand}
                    onChange={(e) => setSqlCommand(e.target.value)}
                    variant="outlined"
                />
                <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleRunSqlCommand} disabled={loading}>
                    {loading ? 'Executing...' : 'Execute'}
                </Button>
            </Paper>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>Results</Typography>
                <TextField
                    fullWidth
                    multiline
                    value={results}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    placeholder="Results will appear here"
                />
                {error && <Typography color="error">Error: {error}</Typography>}
            </Paper>
        </Box>
    );
}

export default RunSqlCommandsPage;
