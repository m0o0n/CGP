import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    blocks: [
        { id: 1, order: 1, type: "image", value: null },
        { id: 2, order: 2, type: "headline", value: "asdasffasffasfa casdasdasd asd sd" },
        { id: 3, order: 3, type: "paragraph", value: "asdasffasffasfa casdasdasd asd sd" },
        { id: 4, order: 4, type: "button", value: "submit" },
    ],
    onDragCurrent: null
}
const constructorReducer = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        setBlocks: (state, action) => {
            console.log(action.payload)
            state.blocks = [...action.payload]
        },
        addBlock: (state, action) => {
            console.log(action.payload)
            state.blocks = [...state.blocks, action.payload]
        },
        editBlock: (state, action) => {
            console.log(action.payload)
            const index =state.blocks.indexOf(state.blocks.find((e) => e.id === action.payload.id)) 
            state.blocks[index] = {...state.blocks[index], value: action.payload.value}
        },
        copyBlock: (state, action) => {
            console.log(action.payload)
            state.blocks = [
                ...state.blocks,
                {...state.blocks.find(e => e.id === action.payload), id: (new Date()).getTime()}
            ]
        },

        deleteBlock: (state, action) => {
            console.log(action.payload)
            state.blocks = [
                ...state.blocks.filter(e => e.id !== action.payload)
            ]
        },
        setDragCurrent: (state, action) => {
            console.log(state, action)
            const date = new Date()
            state.onDragCurrent = { id: date.getTime(), order: date.getTime(), type: action.payload, value: '' }
        }
    }
})
export const {
    setBlocks,
    addBlock, 
    editBlock,
    copyBlock,
    deleteBlock,
    setDragCurrent,
} = constructorReducer.actions
export default constructorReducer.reducer