import * as React from 'react';
import { ImageIcon } from '../../icons/imageIcon'
import { ButtonIcon } from '../../icons/buttonIcon'
import { HeadLineIcon } from '../../icons/headLineIcon'
import { ParagraphIcon } from '../../icons/paragraphIcon'
import { useDispatch } from 'react-redux';
import { setDragCurrent } from '../../store/constructorReducer';
const ToolBar = () => {
    const dispatch = useDispatch()
    const dragStartHandler = (e, target) => {
        dispatch(setDragCurrent(target.dataset.type))
    }
    return (
        <div className='tool_bar'>
            <div
                className="tool_bar__item"
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, e.target)}
                data-type="headline"
            >
                <HeadLineIcon />
                <span>Headline</span>
            </div>
            <div
                className="tool_bar__item"
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, e.target)}
                data-type="paragraph"
            >
                <ParagraphIcon />
                <span>Paragraph</span>
            </div>
            <div
                className="tool_bar__item"
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, e.target)}
                data-type="headline"
            >
                <ImageIcon />
                <span>Image</span>
            </div>
            <div
                className="tool_bar__item"
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, e.target)}
                data-type="button"
            >
                <ButtonIcon />
                <span>Button</span>
            </div>
        </div>
    )
}

export { ToolBar }