import * as React from 'react';
import { TextWidget } from '../widgets/textWidget';
import { useSelector, useDispatch } from 'react-redux';
import { setBlocks, setDragCurrent } from '../../store/constructorReducer';
import { FileWidget } from '../widgets/fileWidget';
import { useState } from 'react';
import { useEffect } from 'react';

const WorkSpace = () => {
    const dispatch = useDispatch()
    const {blocks, onDragCurrent} = useSelector(state => state.Constructor)
    const [items, setItems] = useState(blocks)
    const [currentItem, setCurrentItem] = useState(null)
    useEffect(()=>{
        setItems(blocks)
    }, [blocks])

    useEffect(()=>{
        setCurrentItem(onDragCurrent)
    }, [onDragCurrent])



    const isActiveHandler = (e) => {
        if (e.target.className === "widget") {
            e.target.parentNode.classList.contains('work_space__item__active') 
            ? e.target.parentNode.classList.remove('work_space__item__active')
            : e.target.parentNode.classList.add('work_space__item__active')
            Array.from(e.target.parentNode.parentNode.children).forEach((el) => {
                if (el !== e.target.parentNode) {
                    el.classList.remove('work_space__item__active')
                }
            })
        }
    }

    const dragStartHandler = (e, target) => {
        const currentItemInArray = items.find((el) => el.id === Number(target.dataset.id))
        setCurrentItem(currentItemInArray)
        
    }
    const dragEndHandler = (e) => {
        e.preventDefault()
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
    const onDropHandler = (e) => {
        e.preventDefault()
        e.currentTarget.style.opacity = '1'
    }
    return (

        <div
            className='work_space'
            onDrop={(e) => {
                e.preventDefault()
                if (onDragCurrent && onDragCurrent.type) {
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
                blocks.map(({id, value, type}) => {
                    return (
                        type === 'image'
                            ? <FileWidget
                                key={id}
                                id={id}
                                type={type}
                                dragStartHandler={dragStartHandler}
                                dragEndHandler={dragEndHandler}
                                dragOverHandler={dragOverHandler}
                                onDropHandler={onDropHandler}
                            />
                            : <TextWidget
                                key={id}
                                id={id}
                                textValue={value}
                                type={type}
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