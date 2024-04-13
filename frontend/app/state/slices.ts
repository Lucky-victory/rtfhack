import { communityMessages } from "@/db/schema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//TODO: Add  types
export const communityMessagesState = createSlice({
  name: "communityMessages",
  initialState: {
    data: [] as Record<string, any>[],
  },
  reducers: {
    update: (state, action: PayloadAction<{ data: Record<string, any>[] }>) => {
      state.data = action.payload.data;
    },
    addMessage: (state, action: PayloadAction<{}>) => {
      state.data.push(action.payload);
    },
  },
});

export const { update, addMessage } = communityMessagesState.actions;
