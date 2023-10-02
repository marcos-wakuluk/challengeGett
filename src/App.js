import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
