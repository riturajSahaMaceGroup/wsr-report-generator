import { configureStore } from '@reduxjs/toolkit'

import formSlicereducer from "./formSlice"

import viewControllerReducer from "./viewControllerSlice"
export const store = configureStore({
    reducer: {
        mForm: formSlicereducer,
        viewController: viewControllerReducer
    },
})