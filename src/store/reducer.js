import {
  SET_ADD_RECENT,
  SET_CLEAR_RECENT,
  SET_SEARCH_MODAL,
  SET_IMAGE_MODAL,
  SET_IMAGE_ID,
  SET_ORIENTATION,
  SET_DROPDOWN,
} from "./actions";

const recentFromLocalStorage = JSON.parse(
  localStorage.getItem("search") || "[]"
);

const newArr = [...new Set(recentFromLocalStorage)];

const initialState = {
  recentArr: newArr,
  isSearchModal: false,
  isImageModal: false,
  imageId: null,
  isDropdown: false,
  orientation: "",
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADD_RECENT:
      return {
        ...state,
        recentArr: [...state.recentArr, action.payload],
      };
    case SET_CLEAR_RECENT:
      return {
        ...state,
        recentArr: [],
      };
    case SET_SEARCH_MODAL:
      return {
        ...state,
        isSearchModal: action.payload,
      };
    case SET_IMAGE_MODAL:
      return {
        ...state,
        isImageModal: action.payload,
      };
    case SET_IMAGE_ID:
      return {
        ...state,
        imageId: action.payload,
      };

    case SET_ORIENTATION:
      return {
        ...state,
        orientation: action.payload,
      };

    case SET_DROPDOWN:
      return {
        ...state,
        isDropdown: action.payload,
      };
    default:
      return state;
  }
};
