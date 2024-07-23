import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
}
// Redux Toolkit has a createSlice API that will help us simplify our Redux reducer logic and actions. 
// createSlice does several important things for us: We can write the case reducers as functions inside of an object, instead of having to write a switch/case statement
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails:(state,action)=>{
        // console.log("state ",state);
       
        // console.log("state.user",state.user);
        // console.log("action playload:",action.payload);
        // console.log("user.email:",state.user.email);
        //   setting the action.playload data to the state.user object
        state.user=action.payload;  //user is refer to the initialState.user object
      


    }
  
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer