
import  MainPage  from './MainPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
