import React from 'react';
import { AppBar } from './AppBar/AppBar';
import { useSelector } from 'react-redux';
import { selectError, selectIsLoading } from 'redux/contacts/selectors';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { Container } from '@mui/material';

export const App = () => {
  const RegisterPage = lazy(() => import('../pages/Register'));
  const LoginPage = lazy(() => import('../pages/Login'));
  const HomePage = lazy(() => import('../pages/Home'));
  const ContractsPage = lazy(() => import('../pages/Contacts'));
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <Suspense>
      <Container fixed>
        <div className="App">
          <AppBar />

          {isLoading && !error && <b>Request in progress...</b>}
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegisterPage />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContractsPage />}
                  redirectTo="/login"
                />
              }
            />

            <Route path="/logout/*" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Container>
    </Suspense>
  );
};
