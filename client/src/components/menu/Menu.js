import React from "react";
import { Dropdown } from "antd";
import image from "./frame_2.webp";
import { Link } from "react-router-dom";
import "./menu.css";
import { UserAuth } from "../../context/UseAuth";

const Menu = () => {
  const { user, handlelogout } = UserAuth();
  // console.log(user);
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
    {
      key: "4",
      label: (
        <div
          style={{
            color: "black",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => {
            handlelogout();
          }}>
          log out
        </div>
      ),
    },
  ];
  console.log(items);
  return (
    <div className="menu">
      <div className="logo-main">
        {user ? (
          <div>
            <Link to="/">
              <img className="logo" src={image} />
            </Link>
          </div>
        ) : (
          <img className="logo" src={image} />
        )}
      </div>
      <div className="avatar-main">
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
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Menu;
