import React from 'react';
import NavBar from './components/navBar';
import { Route } from 'react-router-dom';
import Login from './components/NavBar/login';
import Users from './components/NavBar/users';
import Main from './components/NavBar/main';

function App() {
    return (
        <>
            <NavBar />
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?" component={Users} />
        </>
    );
}

export default App;
