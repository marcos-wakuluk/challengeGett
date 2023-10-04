import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
