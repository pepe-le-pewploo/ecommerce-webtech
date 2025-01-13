import React from "react";
import { Outlet } from "react-router-dom";
import bankLogo from '../../assets/PRISM.png'

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-[#081a28] w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">

          <h1 className="text-5xl font-extrabold tracking-tight text-[#c1c7cf]">
            PRISM Banking
          </h1>
          <p className="text-2xl font-semibold tracking-tight text-[#c1c7cf]">
            Safe, Secure, Dependable
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-[#c1c7cf] px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

{
  /* <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div> */
}
