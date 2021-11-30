import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

function PrivateRoute(props) {
  return props.isAuth ? props.children : <Navigate to="/" />
}

function AuthRoute(props) {
  return props.isAuth ? <Navigate to="/create" /> : props.children
}


export const useRoutes = (isAuthenticated) => {
        return (
            <Routes>
              <Route
                path="/links"
                element={
                  <PrivateRoute isAuth={isAuthenticated}>
                    <LinksPage />
                  </PrivateRoute>
                }
                exact
              />

              <Route
                path="/create"
                element={
                  <PrivateRoute isAuth={isAuthenticated}>
                    <CreatePage/>
                  </PrivateRoute>
                }
                exact
              />
              <Route
                path="/detail/:id"
                element={
                  <PrivateRoute isAuth={isAuthenticated}>
                    <DetailPage />
                  </PrivateRoute>
                }
              />

              <Route element={
                <AuthRoute isAuth={isAuthenticated}>
                  <AuthPage />
                </AuthRoute>
              } path="/" exact/>

              <Route
                path="*"
                element={
                  <AuthRoute isAuth={isAuthenticated}>
                    <Navigate to="/" />
                  </AuthRoute>
                }
              />
            </Routes>
        )
}
