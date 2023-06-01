import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Company from './pages/Company/Company';
import CreateCompany from 'pages/Company/createCompany';
import UpdateCompany from 'pages/Company/updateCompany'
import Contract from './pages/Contract/Contract'
import CreateContract from 'pages/Contract/createContract';
import UpdateContract from 'pages/Contract/updateContract'
import Archive from './pages/Archive/Archive'
import CreateArchive from './pages/Archive/createArchive'
import UpdateArchive from './pages/Archive/updateArchive'
import Employee from './pages/Employee/Employee'
import CreateEmployee from 'pages/Employee/createEmployee';
import UpdateEmployee from 'pages/Employee/updateEmployee';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { useMemo } from 'react';
import MainLayout from './layouts/MainLayout';
import CreateUser from 'pages/User/CreateUser';
import UpdateUser from 'pages/User/UpdateUser';
import UserAll from 'pages/User/UserAll';
import UserInfo from 'pages/UserInfo';
// import ArchiveDetails from 'pages/Archive/ArchiveDetails';


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company" element={<Company />} />
            <Route path="/createcompany" element={<CreateCompany />} />
            <Route path="/updatecompany/:id" element={<UpdateCompany />} />
        
            <Route path="/contract" element={<Contract />} />
            <Route path="/createcontract" element={<CreateContract />} />
            <Route path="/updatecontract/:id" element={<UpdateContract />} />

            <Route path="/archive" element={<Archive />} />
            {/* <Route path='/archive/:id' element={<ArchiveDetails/>}/> */}
            <Route path="/createarchive" element={<CreateArchive />} />
            <Route path="/updatearchive/:id" element={<UpdateArchive />} />

            <Route path="/employee" element={<Employee />} />
            <Route path="/createemployee" element={<CreateEmployee />} />
            <Route path="/updateemployee/:id" element={<UpdateEmployee />} />

            <Route path="/userinfo" element={<UserInfo />} />
            <Route path='/userAll' element={<UserAll />} />
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/updateuser/:id" element={<UpdateUser />} />

          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
