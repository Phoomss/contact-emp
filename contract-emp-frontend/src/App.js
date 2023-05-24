import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Company from './pages/Company';
import CreateCompany from 'pages/createCompany';
import UpdateCompany from 'pages/updateCompany'
import Contract from './pages/Contract'
import CreateContract from 'pages/createContract';
import UpdateContract from 'pages/updateContract'
import Archive from './pages/Archive'
import CreateArchive from './pages/createArchive'
import UpdateArchive from './pages/updateArchive'
import Employee from './pages/Employee'
import CreateEmployee from 'pages/createEmployee';
import UpdateEmployee from 'pages/updateEmployee';
import User from './pages/User'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { useMemo } from 'react';
import MainLayout from './layouts/MainLayout';

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
            <Route path="/createcompany" element={<CreateCompany/>}/>
            <Route path="/updatecompany/:id" element={<UpdateCompany/>}/>
            <Route path="/contract" element={<Contract />} />
            <Route path="/createcontract" element={<CreateContract />} />
            <Route path="/updatecontract/:id" element={<UpdateContract />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/createarchive" element={<CreateArchive />} />
            <Route path="/updatearchive/:id" element={<UpdateArchive />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/createemployee" element={<CreateEmployee/>}/>
            <Route path="/updateemployee/:id" element={<UpdateEmployee/>}/>
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
