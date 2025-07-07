import { createSlice } from '@reduxjs/toolkit'
import { WSR_BUSSINESS_VIEW, WSR_VIEW } from '../assets/Constants'

const initialState = {
    show: WSR_VIEW
}

export const viewControllerSlice = createSlice({
    name:"viewController",
    initialState,
    reducers: {
        toggleView:(state)=>{
            state.show = state.show == WSR_VIEW? WSR_BUSSINESS_VIEW:WSR_VIEW
        }
    }
})

export const {toggleView } = viewControllerSlice.actions

export default viewControllerSlice.reducer