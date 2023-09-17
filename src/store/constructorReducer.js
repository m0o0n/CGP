import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    blocks: [
        { id: 1, type: "image", value: null },
        { id: 2, type: "headline", value: "Lorem Impsum" },
        { id: 3, type: "paragraph", value: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus eaque totam beatae, omnis tenetur deserunt eveniet unde at cupiditate quae quas aliquid exercitationem facere corrupti eos. Veniam voluptate totam autem!" },
        { id: 4, type: "button", value: "submit" },
    ],
    onDragCurrent: null
}
const constructorReducer = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        setBlocks: (state, action) => {
            state.blocks = [...action.payload]
        },
        editBlock: (state, action) => {
            const index =state.blocks.indexOf(state.blocks.find((e) => e.id === action.payload.id)) 
            state.blocks[index] = {...state.blocks[index], value: action.payload.value}
        },
        copyBlock: (state, action) => {
            state.blocks = [
                ...state.blocks,
                {...state.blocks.find(e => e.id === action.payload), id: (new Date()).getTime()}
            ]
        },
        deleteBlock: (state, action) => {
            state.blocks = [
                ...state.blocks.filter(e => e.id !== action.payload)
            ]
        },
        setDragCurrent: (state, action) => {
            const date = new Date()
            state.onDragCurrent = { id: date.getTime(), type: action.payload, value: '' }
        }
    }
})
export const {
    setBlocks,
    editBlock,
    copyBlock,
    deleteBlock,
    setDragCurrent,
} = constructorReducer.actions
export default constructorReducer.reducer