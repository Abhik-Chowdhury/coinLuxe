import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { CryptoState } from '../CryptoContext'
import AuthModal from './Authentication/AuthModal'
import UserSideBar from './Authentication/UserSideBar'
import BrandLogo from "./brandlogo.png"
const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },

    brandlogo:{
        maxWidth:50,
        marginRight:30,
        cursor:"pointer",
    }
}))
const Header = () => {
    const classes = useStyles();

    const history = useNavigate();
    const { currency, setCurrency, user } = CryptoState();
    console.log(currency);
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    })
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position='static'>
                <Container>
                    <Toolbar>
                        <img src={BrandLogo} onClick={()=>history("/")} alt='Coin Luxe' className={classes.brandlogo}/>
                        <Typography onClick={() => history("/")} className={classes.title} variant='h6'>
                            Coin Luxe
                        </Typography>
                        <Select variant="outlined" style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                        }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>

                        {user ? <UserSideBar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>

    )
}

export default Header