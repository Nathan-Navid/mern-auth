import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegLogForm from './components/RegLogForm';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegLogForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
