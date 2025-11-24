import { createSlice } from '@reduxjs/toolkit'
import { CONSULT, CONSTRUCT } from '../assets/Constants'

const initialState = {
    show: CONSTRUCT
}

export const viewControllerSlice = createSlice({
    name:"viewController",
    initialState,
    reducers: {
        toggleView:(state)=>{
            state.show = state.show == CONSTRUCT? CONSULT:CONSTRUCT
        }
    }
})

export const {toggleView } = viewControllerSlice.actions

export default viewControllerSlice.reducer