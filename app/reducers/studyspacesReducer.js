import { surveys } from "../constants/studyspaces";
import {
  WORKSPACES_FETCH_SEATINFO_FAILURE,
  WORKSPACES_IS_FETCHING_SEATINFO,
  WORKSPACES_FETCH_SEATINFO_SUCCESS,
} from "../constants/studyspacesConstants";

export const initialState = {
  studyspaces: surveys.map(survey => ({
    ...survey,
    occupied: 0,
    capacity: 0,
    fetchSeatInfoError: "",
    isFetchingSeatinfo: false,
  })),
  isFetchingSpaces: false,
};

export default (state = initialState, action = null) => {
  const { type, id, data, error } = action;

  switch (type) {
    case WORKSPACES_IS_FETCHING_SEATINFO: {
      const space = state.studyspaces.filter(s => s.id === id)[0];
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          { ...space, isFetchingSeatinfo: true, fetchSeatInfoError: "" },
        ];
        return { ...state, studyspaces: newStudyspaces };
      }
      return state;
    }

    case WORKSPACES_FETCH_SEATINFO_FAILURE: {
      const space = state.studyspaces.filter(s => s.id === id)[0];
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          { ...space, isFetchingSeatinfo: false, fetchSeatInfoError: error },
        ];
        return { ...state, studyspaces: newStudyspaces };
      }
      return state;
    }

    case WORKSPACES_FETCH_SEATINFO_SUCCESS: {
      const space = state.studyspaces.filter(s => s.id === id)[0];
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          { ...space, ...data, isFetchingSeatinfo: false },
        ];
        return { ...state, studyspaces: newStudyspaces };
      }
      return state;
    }
    default:
      return state;
  }
};