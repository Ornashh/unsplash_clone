import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import API, { SECRET_KEY } from "../api";
import { useClickAway } from "../../utils/useClickAway";
import SearchModal from "../SearchModal";

import s from "./header.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  const [photoOfTheDay, setPhotoOfTheDay] = useState({});
  const [value, setValue] = useState("");
  useClickAway(input, () => {
    dispatch({ type: "DISPLAY_MODAL_SEARCH", payload: false });
  });

  useEffect(() => {
    API.get(
      `collections/1459961/photos?client_id=${SECRET_KEY}&orientation=landscape&per_page=1`
    ).then((response) => {
      setPhotoOfTheDay(response.data[0]);
    });
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      dispatch({ type: "ADD_RECENT", payload: value });
      history.push(`/photos/${value}`);
    }
  };

  const handleModalSearchOpen = () => {
    dispatch({ type: "DISPLAY_MODAL_SEARCH", payload: true });
  };

  return (
    <div className={s.header_outer}>
      <div className={s.header_image}>
        <LazyLoadImage
          src={photoOfTheDay.urls?.regular}
          alt={photoOfTheDay?.description}
          effect="blur"
        />
      </div>
      <div className={s.header_inner}>
        <form className={s.search_wrapper} onSubmit={handleSubmit} ref={input}>
          <div className={s.search}>
            <span>
              <AiOutlineSearch />
            </span>
            <input
              type="text"
              placeholder="Search"
              onChange={handleChange}
              onClick={handleModalSearchOpen}
            />
          </div>
          <SearchModal />
        </form>
      </div>
    </div>
  );
};

export default Header;
