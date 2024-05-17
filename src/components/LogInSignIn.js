import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Route, Navigate ,useNavigate } from 'react-router-dom';

export default function LogInSignIn() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logInUsername, setLogInUsername] = useState('');
    const [logInPassword, setLogInPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        
        const response = await fetch(`http://localhost:8080/user/${logInUsername}`,{
          method:"GET",
          headers:{"Content-Type":"application/json"},
          //body:JSON.stringify(username)
        });
  
        const user = await response.json();
      
        if(response.ok==false){
          const user={username, email, password};
          const response2 = await fetch(`http://localhost:8080/user/add`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
          });
          alert("You are signed up!");

          setTimeout(() => {
               // navigate('/');
            }, 1000);
        }
        else{
          alert("username is already taken!");
        }
      };

    const handleLogIn = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:8080/user/isExist/${logInUsername}:${logInPassword}`,{
          method:"GET",
          headers:{"Content-Type":"application/json"},
          //body:JSON.stringify(username)
        });
    
        const reponse = await response.json();

        console.log(reponse);
        if(reponse){
            // Display a message
            alert('You have successfully logged in!');
      
            // Wait for 3 seconds before navigating
            const response1 = await fetch(`http://localhost:8080/user/${logInUsername}`,{
                method:"GET",
                headers:{"Content-Type":"application/json"},
                //body:JSON.stringify(username)
              });
              
              const user = await response1.json();

            setTimeout(() => {
                navigate('/home', { state: { myVariable: user } });
            }, 1000);
        }
    else{
        alert('wrong username or password');
    }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ width: '100%', backgroundColor: '#1565c0' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Log In / Sign Up
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} justifyContent="center" style={{ padding: 16 }}>
                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        onSubmit={handleLogIn}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography variant="h5" sx={{ mb: 2 }}>Log In</Typography>
                        <TextField
                            id="login-username"
                            label="Username"
                            variant="outlined"
                            value={logInUsername}
                            onChange={(e) => setLogInUsername(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id="login-password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={logInPassword}
                            onChange={(e) => setLogInPassword(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button type="submit" variant="contained" sx={{ width: '100%' }}>Log In</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        onSubmit={handleSignIn}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography variant="h5" sx={{ mb: 2 }}>Sign Up</Typography>
                        <TextField
                            id="signup-username"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id="signup-email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id="signup-password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button type="submit" variant="contained" sx={{ width: '100%' }}>Sign Up</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
