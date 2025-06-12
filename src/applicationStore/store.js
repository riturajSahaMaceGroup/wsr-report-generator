import { configureStore } from '@reduxjs/toolkit'

import formSlicereducer from "./formSlice"
export const store = configureStore({
    reducer: {
        mForm: formSlicereducer
    },
})