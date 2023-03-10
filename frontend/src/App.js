import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Calendar from './components/Calendar'
import Tasks from './components/Tasks'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'
import './App.css';

function App() {
  return (
    <div className='container'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/tasks' element={<Tasks />}></Route>
        <Route path='/calendar' element={<Calendar />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
