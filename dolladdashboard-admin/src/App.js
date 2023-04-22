import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SavingTable from './Component/SavingAdminPane';
import ContributionTable from './Component/contributionAdminPane';
import Header from './Component/Header';
import Footer from './Component/PageFooter';
import UserTable from './Component/UserAdminPane';

function App() {
  return (
    
    <Router>
      <Header></Header>
    <Routes>
    <Route path="/saving" element={<SavingTable></SavingTable>}></Route>
    <Route path="/contribution" element={<ContributionTable></ContributionTable>}></Route>
    <Route path="/user" element={<UserTable></UserTable>}></Route>
          {/* <Route path="/" element={<LoginForm></LoginForm>}></Route>
          <Route exact path="/register" element={<RegisterForm></RegisterForm>} /> */}
          {/* <Route exact path="/saving" element={<SaveGoalForm></SaveGoalForm>} />
          <Route exact path="/saving/:id" element={<GoalDetails></GoalDetails>} />
          <Route exact path="/stock" element={<StockCalculator></StockCalculator>} /> */}
          {/* <Route exact path="/about-us" element={<AboutUsPage></AboutUsPage>} />
          <Route exact path="/contact-us" element={<ContactUsPage></ContactUsPage>} />
          <Route exact path="/job" element={<Job></Job>} /> */}
          
          {/* <Route path="/contact" component={ContactPage} /> */}
        
    </Routes>
    </Router>
  );
}

export default App;
