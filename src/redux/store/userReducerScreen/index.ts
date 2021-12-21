import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateInterface, UserInterface } from "./types";
import { loginAccount } from "@/service/api/account/login";
import { RootState } from "@/redux/index";

export const USER_NAME = "user";
const initialState: UserStateInterface = {
  isLoadingLogin: false,
  userInfo: {},
};
const login = createAsyncThunk(
  USER_NAME + "/login",
  async (requestParams: any) => {
    const resp = await loginAccount(requestParams);
    if (resp.data.code !== 0) {
      return;
    }
    return resp.data;
  }
);

const userSlice = createSlice({
  name: USER_NAME,
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {   
      state.userInfo = action.payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoadingLogin = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoadingLogin = false;
      if (action.payload?.code !== 0) {
        return;
      }

      state.userInfo = action.payload.payload;
    });
  },
});

export const userSelectors = {
  getState: (state: RootState) => state.user.userInfo,
  isLogger: (state: RootState) => !!state.user.userInfo?.email,
  getUserInfo: (state: RootState) => state.user.userInfo,
};

export const userActions = {
  login,
  ...userSlice.actions,
};
export default userSlice.reducer;
