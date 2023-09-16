import * as React from 'react';
import { TextWidget } from '../widgets/textWidget';
import { useSelector, useDispatch } from 'react-redux';
import { addBlock, setDragCurrent } from '../../store/constructorReducer';
import { FileWidget } from '../widgets/fileWidget';


const WorkSpace = ({ onDrop, onDragOver }) => {
    const data = useSelector(state => state.Constructor)
    const dispatch = useDispatch()
    console.log(data)
    const isActiveHandler = (e) => {
        if (e.target.className === "widget") {
            e.target.parentNode.classList.add('work_space__item__active')
            console.log(Array.from(e.target.parentNode.parentNode.children))
            Array.from(e.target.parentNode.parentNode.children).forEach((el) => {
                if (el !== e.target.parentNode) {
                    el.classList.remove('work_space__item__active')
                }

            })
        }
    }
    
    return (

        <div
            className='work_space'
            onDrop={(e) => {
                e.preventDefault()
                if(data.onDragCurrent && data.onDragCurrent.type){
                    dispatch(addBlock(data.onDragCurrent))  
                    dispatch(setDragCurrent(null))
                }
            }}
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onClick={(e) => {
                isActiveHandler(e)
            }}
        >
            {
                data.blocks.map((el) => {
                    return (
                        el.type === 'image'
                            ? <FileWidget
                                key={el.id}
                                id={el.id}
                                type={el.type}
                             />
                            : <TextWidget
                                key={el.id}
                                id={el.id}
                                textValue={el.value}
                                type={el.type}
                                
                            />
                    )
                })
            }
        </div>
    )
}

export { WorkSpace }