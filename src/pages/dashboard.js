import React from 'react';
import "../css/dashboard.css";
import FriendList from '../components/FriendList.js';
import PreviousTables from '../components/PreviousTables';
import Sidebar from '../components/Sidebar';

export default function Dashboard () {
    return(
        <div className="dashboard-wrapper">
            <Sidebar /> 
            <PreviousTables /> 
            <FriendList />           
        </div>
    )
}