import './App.css';
import HomeDashboard from './Screens/Home/home';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5050ff',
      main: '#00008b',
      dark: '#00003f'
    },
    secondary: {
      light: '#00a5a5',
      main: '#008b8b',
      dark: '#003f3f'
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomeDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
