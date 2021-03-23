import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import "../css/dashboard.css";

export default function Sidebar() {
  return (
    <ProSidebar>
      <Menu iconShape="round" className="sidebar-height">
        <SidebarHeader></SidebarHeader>
        <MenuItem
          icon={
            <img className="" alt="" src="/icons8_dashboard_layout.ico"></img>
          }
        >
          Página Principal
          <Link to="/dashboard"></Link>
        </MenuItem>
        <SubMenu
          title="Mesas"
          icon={<img className="" alt="" src="/dice.ico"></img>}
        >
          <MenuItem>
            Procurar Mesas
            <Link to="/searchTables"></Link>
          </MenuItem>
          <MenuItem>Mesas Favoritas</MenuItem>
          <MenuItem>Minhas Mesas</MenuItem>
          <MenuItem>
            Criar Mesa
            <Link to="/createTable"></Link>
          </MenuItem>
        </SubMenu>
        <SubMenu
          title="Configurações"
          icon={<img className="" alt="" src="/icons8_automation.ico"></img>}
        >
          <MenuItem>
            Logout
            <Link to="/logout"></Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
}
