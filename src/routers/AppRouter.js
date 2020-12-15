import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Redirect
} from "react-router-dom";

import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';

export const AppRouter = () => {


    const dispatch = useDispatch();

    //Flag para esperar respuesta desde Firebase
    const [checking, setChecking] = useState(true);

    //Flag para verificar que esté autenticado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Para verificar que el usuario esté logueado
    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            //Ya culminó chequeo
            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated= {isLoggedIn}
                    />

                    <PrivateRoutes
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated= {isLoggedIn}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
