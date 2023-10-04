
import './App.css';
import Homepage from './Pages/Homepage'
import CoinePage from './Pages/CoinePage';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Alert from "./components/Alert"
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Homepage/>}/>
          <Route exact path="/coins/:id" element={<CoinePage/>} />
        </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
