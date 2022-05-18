import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { LazyLoadImage } from "react-lazy-load-image-component";
import ImagesMasonry from "../ImagesMasonry";

import s from "./imagesGrid.module.scss";

const ImagesGrid = ({ setIsFetching, images }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function () {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 1000) {
      setIsFetching(true);
    }
  };

  const handleDisplayModal = (id) => {
    dispatch({
      type: "DISPLAY_MODAL_IMAGE",
      payload: { isOpen: true, id: id },
    });
  };

  return (
    <div>
      <div className="container">
        <ImagesMasonry>
          {images.map((el, i) => {
            return (
              <div
                key={i}
                className={s.image}
                onClick={() => handleDisplayModal(el.id)}
              >
                <LazyLoadImage
                  src={el.urls.regular}
                  alt={el.description}
                  effect="blur"
                />
                <div className={s.user_info_wrapper}>
                  <div className={s.user_info}>
                    <span>
                      <img
                        src={el.user.profile_image.small}
                        alt="description"
                      />
                    </span>
                    <h3>{el.user.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </ImagesMasonry>
      </div>
    </div>
  );
};

export default ImagesGrid;