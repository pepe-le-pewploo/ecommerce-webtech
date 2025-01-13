import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AuthLayout from "./components/auth/AuthLayout";
import Home from "./pages/bank/Home";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const {user, isAuthenticated,isLoading} = useSelector(state => state.auth)
  console.log('from appjsx ')
  console.log(user, isAuthenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if(isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/home" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Home />
            </CheckAuth>}/>
      </Routes>
    </div>
  );
}

export default App;
