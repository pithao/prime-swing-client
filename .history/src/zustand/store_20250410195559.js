import { create } from "zustand";
import userSlice from './slices/user.slice.js';
import surveySlice from './slices/survey.slice.js'
import responseSlice from './slices/response.slice.js'


// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...surveySlice(...args),
  // ...responseSlice(...args)
}));


export default useStore;
