import React, { useEffect, useState } from "react";

import s from "./header.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Form from "../Form";
import RenderIf from "../../utils/renderIf";
import { useMatch } from "../../hooks/useMatch";
import { getBackgroundImage } from "./api";

const Header = () => {
  const [photoOfTheDay, setPhotoOfTheDay] = useState({});
  const matches = useMatch();

  useEffect(() => {
    getBackgroundImage().then((res) => {
      setPhotoOfTheDay(res[0]);
    });
  }, []);

  return (
    <div className={s.header_outer}>
      <div className={s.header_image}>
        <LazyLoadImage
          src={photoOfTheDay.urls?.regular}
          alt={photoOfTheDay?.description}
          effect="blur"
        />
      </div>
      <div className="container">
        <div className={s.header_inner}>
          <div className={s.header_content}>
            <h1>Unsplash</h1>
            <div className={s.search_wrapper}>
              <RenderIf isTrue={matches}>
                <Form />
              </RenderIf>
            </div>
            <RenderIf isTrue={photoOfTheDay.user?.username}>
              <div className={s.user}>
                <h6>
                  Photo of the Day by{" "}
                  <span>{photoOfTheDay.user?.username}</span>
                </h6>
                {/*<p>{photoOfTheDay.user?.username}</p>*/}
              </div>
            </RenderIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
