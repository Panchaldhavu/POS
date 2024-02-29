import 'antd/dist/antd'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Item from './pages/Item';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Bill from './pages/Bill';
import Timer from './pages/Timer';


function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={
        <ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/items' element={<ProtectedRoute><Item /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/bills' element={<ProtectedRoute><Bill /></ProtectedRoute>} />
        <Route path='/timer' element={<Timer/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;


export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}