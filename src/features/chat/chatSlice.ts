import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type ChatState = {
  chatId: string;
};

const initialState: ChatState = {
  chatId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
  },
});

export const { setChatId } = chatSlice.actions;

export default chatSlice.reducer;

export const selectCurrentChatId = (state: RootState) => state.chat.chatId;
