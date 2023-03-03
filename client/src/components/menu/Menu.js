import React from "react";
import { Dropdown } from "antd";
import image from "./frame_2.webp";
import { Link } from "react-router-dom";
import "./menu.css";
import { UserAuth } from "../../context/UseAuth";

const Menu = () => {
  const { user } = UserAuth();
  console.log(user);
  const items = [
    {
      key: "1",
      label: (
        <div>
          <Link
            to="/"
            style={{
              color: "black",
              display: "flex",
              justifyContent: "center",
            }}>
            home
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <Link
            to="/watchlist"
            style={{
              color: "black",
              display: "flex",
              justifyContent: "center",
            }}>
            watchlist
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          <Link
            to="/profile"
            style={{
              color: "black",
              display: "flex",
              justifyContent: "center",
            }}>
            profile
          </Link>
        </div>
      ),
    },
  ];
  const items1 = [
    {
      key: "1",
      label: (
        <div>
          <Link
            to="/login"
            style={{
              color: "black",
              display: "flex",
              justifyContent: "center",
            }}>
            login
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <Link
            to="/signin"
            style={{
              color: "black",
              display: "flex",
              justifyContent: "center",
            }}>
            signin
          </Link>
        </div>
      ),
    },
  ];
  console.log(items);
  return (
    <div className="menu">
      {user ? (
        <div>
          <Link to="/">
            <img className="logo" src={image} />
          </Link>
        </div>
      ) : (
        <img className="logo" src={image} />
      )}
      {user ? (
        <div>
          <Dropdown
            overlayStyle={{
              width: "300px",
              height: "300px",
              textDecoration: "none",
            }}
            size="64px"
            menu={{ items }}
            arrow>
            <img className="avatar" src={image} />
          </Dropdown>
        </div>
      ) : (
        <div>
          <Dropdown
            overlayStyle={{
              width: "300px",
              height: "300px",
              textDecoration: "none",
            }}
            size="64px"
            menu={{ items1 }}
            arrow>
            <img className="avatar" src={image} />
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Menu;
