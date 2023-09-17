import * as React from 'react';
import { TextWidget } from '../widgets/textWidget';
import { useSelector, useDispatch } from 'react-redux';
import { addBlock, setBlocks, setDragCurrent } from '../../store/constructorReducer';
import { FileWidget } from '../widgets/fileWidget';
import { useState } from 'react';
import { useEffect } from 'react';

const WorkSpace = ({ onDrop, onDragOver }) => {
    const data = useSelector(state => state.Constructor)
    useEffect(()=>{
        setItems(data.blocks)
    }, [data.blocks])

    useEffect(()=>{
        setCurrentItem(data.onDragCurrent)
    }, [data.onDragCurrent])


    const dispatch = useDispatch()
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
    const [items, setItems] = useState(data.blocks)
    const [currentItem, setCurrentItem] = useState(null)
    const dragStartHandler = (e, target) => {

        console.log('dragStartHandler', target)
        const currentItemInArray = items.find((el) => el.id === Number(target.dataset.id))
        console.log(target)
        setCurrentItem(currentItemInArray)
        
    }
    const dragEndHandler = (e) => {
        e.preventDefault()
        console.log('dragEndHandler')
        e.currentTarget.style.opacity = '1'
    }
    const dragOverHandler = (e) => {
        e.preventDefault()
        e.currentTarget.style.opacity = '0'
        if(currentItem){
            const overedId = Number(e.currentTarget.dataset.id)
            const indexOfOvered = items.indexOf(items.find(e=> e.id === overedId))
            const copy = [...items.filter(e=> e.id !== currentItem.id)]
            copy.splice(indexOfOvered, 0, currentItem)
            setItems(copy)
            if(overedId !== currentItem.id){
                dispatch(setBlocks(copy))
            }
        }
        
    }
    const onDropHandler = (e, target) => {
        e.preventDefault()
        e.currentTarget.style.opacity = '1'
        console.log('onDropHandler', target, currentItem)
    }
    return (

        <div
            className='work_space'
            onDrop={(e) => {
                e.preventDefault()
                if (data.onDragCurrent && data.onDragCurrent.type) {
                    dispatch(setDragCurrent(null))
                    console.log(items)
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
                                dragStartHandler={dragStartHandler}
                                dragEndHandler={dragEndHandler}
                                dragOverHandler={dragOverHandler}
                                onDropHandler={onDropHandler}
                            />
                            : <TextWidget
                                key={el.id}
                                id={el.id}
                                textValue={el.value}
                                type={el.type}
                                dragStartHandler={dragStartHandler}
                                dragEndHandler={dragEndHandler}
                                dragOverHandler={dragOverHandler}
                                onDropHandler={onDropHandler}
                            />
                    )
                })
            }
        </div>
    )
}

export { WorkSpace }