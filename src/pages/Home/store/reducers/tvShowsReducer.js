import {
  GET_ALL_TV_SHOWS_SUCCESS,
  GET_ALL_TV_SHOWS_FAILURE,
  GET_ALL_TV_SHOWS_REQUEST,
  SEARCH_TV_SHOWS_SUCCESS,
  SEARCH_TV_SHOWS_FAILURE,
  SEARCH_TV_SHOWS_REQUEST,
  SET_DROPDOWN_VALUE,
  SET_PAGINATION,
} from "../actions/homeActionTypes";

import { genresOptions } from "../../constants/genresOptions";

import produce from "immer";

const initialState = {
  tvShows: [],
  filteredShows: [],
  isFetching: false,
  selected: genresOptions[0].value,
  currentPageIndex: 1,
  itemsPerPage: 50,
  error: null,
};

const tvShowsReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_TV_SHOWS_REQUEST:
        draft.isFetching = true;
        break;

      case GET_ALL_TV_SHOWS_SUCCESS:
        draft.tvShows = action.tvShows;
        draft.isFetching = false;
        draft.error = null;
        break;

      case GET_ALL_TV_SHOWS_FAILURE:
        draft.tvShows = [];
        draft.isFetching = false;
        draft.error = action.error;
        break;

      case SEARCH_TV_SHOWS_REQUEST:
        draft.isFetching = true;
        break;

      case SEARCH_TV_SHOWS_SUCCESS:
        draft.filteredShows = action.tvShows.map((item) => item.show);
        draft.isFetching = false;
        draft.error = null;
        break;

      case SEARCH_TV_SHOWS_FAILURE:
        draft.filteredShows = [];
        draft.isFetching = false;
        draft.error = action.error;
        break;

      case SET_DROPDOWN_VALUE:
        draft.selected = action.value;
        break;

      case SET_PAGINATION:
        draft.currentPageIndex = action.index;
        break;

      default:
        return state;
    }
  });
};

export default tvShowsReducer;
