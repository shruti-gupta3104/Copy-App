import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  copies: localStorage.getItem("copies")
  ?  JSON.parse(localStorage.getItem("copies"))
  : [ ]
}


export const copySlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    addToCopy: (state, action) => {
      const copy = action.payload;
      state.copies.push(copy);
      localStorage.setItem("copies", JSON.stringify(state.copies));
        toast.success("Copy added successfully!");
    },
    updateToCopy: (state, action) => {
      const copy = action.payload;
      const index = state.copies.findIndex( (item)=> item._id === copy._id);
      if (index >=0){
        state.copies[index] = copy;
        localStorage.setItem("copies", JSON.stringify(state.copies));
        toast.success("Paste updated successfully!");
      }
    },
    resetAllCopy: (state) => {
       state.copies = []
      // Update to localstorage
      localStorage.removeItem("copies")
    },
    removeFromCopy: (state, action)=>{
      const copyId = action.payload;

      console.log(copyId);
      const index = state.copies.findIndex((item) => item._id === copyId);

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.copies.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("copies", JSON.stringify(state.copies))
        // show toast
        toast.success("Copy deleted")
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCopy, updateToCopy, resetAllCopy,
    removeFromCopy } = copySlice.actions

export default copySlice.reducer