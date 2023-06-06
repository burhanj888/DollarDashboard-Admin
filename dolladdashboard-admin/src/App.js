import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SavingTable from './Component/SavingAdminPane';
import ContributionTable from './Component/contributionAdminPane';
import Header from './Component/Header';
import Footer from './Component/PageFooter';
import UserTable from './Component/UserAdminPane';
import LoginForm from './Component/Login/LoginComponent';
import ExpenseTable from './Component/ExpenseAdminPane';
import RegisterForm from './Component/Registration/RegisterComponent';


function App() {
  return (
    
    <Router>
      
    <Routes>
    <Route path="/" element={<LoginForm></LoginForm>}></Route>
    <Route path="/saving" element={<SavingTable></SavingTable>}></Route>
    <Route path="/contribution" element={<ContributionTable></ContributionTable>}></Route>
    <Route path="/user" element={<UserTable></UserTable>}></Route>
    <Route path="/expenses" element={<ExpenseTable></ExpenseTable>}></Route>
    <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>
        
    </Routes>
    </Router>
  );
}

export default App;
