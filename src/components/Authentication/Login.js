import React, { useState } from 'react'
import { Box, Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaase';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const { setAlert } = CryptoState()
    const handleSubmit = async () => {
        if (!password || !email) {
            setAlert({
                open: true,
                message: "Please fill All the Fileds",
                type: 'error',
            });
            return;
        }

        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            console.log(result)
            setAlert({
                open: true,
                message: `Login SuccesFull, WelCome ${result.user.email}`,
                type: "success",
            });
            handleClose()
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error',
            });
            return;
        }
    };
    return (
        <Box p={5}
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "25px",
                gap: "20px",
            }}
        >
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                type={showPassword ? "text" : "password"}
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    )
}

export default Login