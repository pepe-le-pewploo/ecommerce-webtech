import React from "react";
import "./Header.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import bankLogo from '../../../assets/PRISM.png'

const Header = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <div className="header">
      <div className="logo">
        <img src={bankLogo} alt="Bank Logo" />
        <div className="logotitle">
          {/* <h1>Prism</h1>
          <p>Banking</p> */}
        </div>
      </div>
      <div className="list">
        <div className="unordered-list-wrapper">
          <ul className="unordered-list">
            <li>Personal</li>
            <li>SmallBusiness</li>
            <li>Commercial</li>
            <li>About Us</li>
            <li>Private Client</li>
          </ul>
        </div>
        <div className="unordered-list-wrapper">
          <ul className="unordered-list">
            <li>Banking</li>
            <li>Credit Cards</li>
            <li>Borrowing</li>
            <li>Investing</li>
            <li>Resources</li>
            <li>Prosper And Thrive</li>
          </ul>
        </div>
      </div>
      <div className="right-end-container flex items-center gap-4">
        <div className="relative flex items-center">
          <Input
            className="pl-10 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Search for ATM/Branch locations"
          />
          <MapPin className="absolute left-2 text-gray-400" />
        </div>
        <Button className="py-2 px-4 bg-black text-white rounded-md hover:[#c1c7cf] focus:outline-none focus:ring focus:ring-red-300" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
