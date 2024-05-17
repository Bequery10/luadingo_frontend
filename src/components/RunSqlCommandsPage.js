import React, { useState } from 'react';
import { Button, Box, TextField, Typography, Paper } from '@mui/material';
import { useNavigate , useLocation} from 'react-router-dom'; // Ensure this is correctly imported

function RunSqlCommandsPage() {
    const location = useLocation();
    const user = location.state?.myVariable;
    const navigate = useNavigate(); // Correct use of useNavigate
    const [sqlCommand, setSqlCommand] = useState('');
    const [results, setResults] = useState('');

    // Simulate running an SQL command
    const handleRunSqlCommand = () => {
        console.log('Running SQL Command:', sqlCommand);
        // Simulate result; replace this with your actual API call
        setResults(`Results of: ${sqlCommand}`);
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
                <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleRunSqlCommand}>
                    Execute
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
            </Paper>
        </Box>
    );
}

export default RunSqlCommandsPage;
