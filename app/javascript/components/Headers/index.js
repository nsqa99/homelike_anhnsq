import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useSelector } from "react-redux";
// import { auth } from "firebase";

const Headers = () => {
  const basket = useSelector(({ items: { basket } }) => basket);
  // const history = useHistory();
  // const login = () => {
  //   if (user) {
  //     auth().signOut();
  //     history.push("/login");
  //   }
  // };

  const [openModal, toggleModal] = useState(false);

  return (
    <nav styleName="header">
      {openModal && (
        <CartModal openModal={openModal} onClose={() => toggleModal(false)} />
      )}
      {/* logo on the left -> img */}
      <Link to="/">
        <img
          styleName="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>
      {/* search box */}
      <div styleName="header__search">
        <input type="text" styleName="header__searchInput" />
        <SearchIcon styleName="header__searchIcon" />
      </div>
      {/* 3 links */}
      <div styleName="header__nav">
        {/* <Link to={!user && "/login"} styleName="header__link">
            <div onClick={login} styleName="header__option">
              <span styleName="header__optionLineOne">Hello {user?.email}</span>
              <span styleName="header__optionLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link> */}
      </div>
      <div styleName="header__nav">
        <Link to="/order" styleName="header__link">
          <div styleName="header__option">
            <span styleName="header__optionLineOne">Returns</span>
            <span styleName="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
      </div>
      <div styleName="header__nav">
        <Link to="/login" styleName="header__link">
          <div styleName="header__option">
            <span styleName="header__optionLineOne">Your</span>
            <span styleName="header__optionLineTwo">Prime</span>
          </div>
        </Link>
      </div>
      <Link to="/checkout" styleName="header__link">
        <div styleName="header__optionBasket">
          <ShoppingBasketIcon />
          <span styleName="header__optionLineTwo header__basketCount">
            {basket.length}
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default CSSModules(Headers, styles, { allowMultiple: true });
