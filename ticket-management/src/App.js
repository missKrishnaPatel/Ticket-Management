
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/form';
import History from './components/history';
import TicketDetail from './components/detail';
import LoginPage from './components/loginPage';
import SignUpPage from './components/signup.jsx';
import Dashboard from './components/dashboard.jsx';
import EditTicket from './components/edit.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/detail/:id" element={<TicketDetail />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create" element={<Form />} />
        <Route path="/history" element={<History />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
        <Route path='/dashboard/:id' element={<Dashboard/>}/>
        <Route path="/edit/:id" element={<EditTicket />} />

      </Routes>
    </Router>
  );
}

export default App;















// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
