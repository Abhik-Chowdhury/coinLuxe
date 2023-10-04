import { Box, Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {createUserWithEmailAndPassword} from "firebase/auth"
import { CryptoState } from '../../CryptoContext';
import { auth } from "../../firebaase"
const Signup = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const { setAlert } = CryptoState()

    const handleSubmit = async () => {

        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: "Password Do Not Match",
                type: 'error',
            });
            return
        }
        else if (password.length < 6) {
            setAlert({
                open: true,
                message: "Password Lenth less than 6",
                type: 'error',
            });
            return

        }

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(result);
            setAlert({
                open: true,
                message: `Sign up SuccesFull, WelCome ${result.user.email}`,
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
            <TextField
                variant="outlined"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />

            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </Box>
    )
}

export default Signup