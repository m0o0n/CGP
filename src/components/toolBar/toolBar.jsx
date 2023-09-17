import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ImageIcon } from '../../icons/imageIcon';
import { ButtonIcon } from '../../icons/buttonIcon';
import { HeadLineIcon } from '../../icons/headLineIcon';
import { ParagraphIcon } from '../../icons/paragraphIcon';
import { setDragCurrent } from '../../store/constructorReducer';

function ToolBar() {
  const dispatch = useDispatch();
  const dragStartHandler = (e, target) => {
    dispatch(setDragCurrent(target.dataset.type));
  };
  return (
    <div className="tool_bar">
      <div
        className="tool_bar__item"
        draggable
        onDragStart={(e) => dragStartHandler(e, e.target)}
        data-type="headline"
      >
        <HeadLineIcon />
        <span>Headline</span>
      </div>
      <div
        className="tool_bar__item"
        draggable
        onDragStart={(e) => dragStartHandler(e, e.target)}
        data-type="paragraph"
      >
        <ParagraphIcon />
        <span>Paragraph</span>
      </div>
      <div
        className="tool_bar__item"
        draggable
        onDragStart={(e) => dragStartHandler(e, e.target)}
        data-type="image"
      >
        <ImageIcon />
        <span>Image</span>
      </div>
      <div
        className="tool_bar__item"
        draggable
        onDragStart={(e) => dragStartHandler(e, e.target)}
        data-type="button"
      >
        <ButtonIcon />
        <span>Button</span>
      </div>
    </div>
  );
}

export { ToolBar };
