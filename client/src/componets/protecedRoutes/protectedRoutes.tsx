import React from "react";
import { Outlet } from "react-router";
import { useAppSelector } from "/src/features/hooks/hooks";
import { selectIsLogin } from "/src/features/slices/authSlice";
import { LoginPage } from "/src/pages/loginPage";

export const ProtectedRoutes: React.FC = () => {
  const isAuth = useAppSelector(selectIsLogin);

  return (
    isAuth ? <Outlet /> : <LoginPage />
  );
};
