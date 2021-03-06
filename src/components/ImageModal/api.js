import instance from "../../axios";
import { SECRET_KEY } from "../../utils/constants";

export const getImage = (id) => {
  return instance(true)
    .get(`photos/${id}?client_id=${SECRET_KEY}`)
    .then((res) => {
      return res?.data;
    });
};

export const getRelated = (username) => {
  return instance(true)
    .get(`users/${username}/photos?client_id=${SECRET_KEY}&per_page=9`)
    .then((res) => {
      return res?.data;
    });
};
