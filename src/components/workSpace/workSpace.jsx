import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { TextWidget } from '../widgets/textWidget';
import { setBlocks, setDragCurrent } from '../../store/constructorReducer';
import { FileWidget } from '../widgets/fileWidget';

function WorkSpace() {
  const dispatch = useDispatch();
  const { blocks, onDragCurrent } = useSelector((state) => state.Constructor);
  const [items, setItems] = useState(blocks);
  const [currentItem, setCurrentItem] = useState(null);
  useEffect(() => {
    setItems(blocks);
  }, [blocks]);

  useEffect(() => {
    setCurrentItem(onDragCurrent);
  }, [onDragCurrent]);

  const isActiveHandler = (e) => {
    if (e.target.className === 'widget') {
      if (e.target.parentNode.classList.contains('work_space__item__active')) {
        e.target.parentNode.classList.remove('work_space__item__active');
      } else {
        e.target.parentNode.classList.add('work_space__item__active');
      }
      Array.from(e.target.parentNode.parentNode.children).forEach((el) => {
        if (el !== e.target.parentNode) {
          el.classList.remove('work_space__item__active');
        }
      });
    }
  };

  const dragStartHandler = (e) => {
    const currentItemInArray = items.find((el) => el.id === Number(e.currentTarget.dataset.id));
    setCurrentItem(currentItemInArray);
  };
  const dragEndHandler = (e) => {
    const element = e;
    element.preventDefault();
    element.currentTarget.style.opacity = '1';
  };
  const dragOverHandler = (e) => {
    const element = e;
    element.preventDefault();
    element.currentTarget.style.opacity = '0';
    if (currentItem) {
      const overedId = Number(e.currentTarget.dataset.id);
      const indexOfOvered = items.indexOf(items.find((el) => el.id === overedId));
      const copy = [...items.filter((el) => el.id !== currentItem.id)];
      copy.splice(indexOfOvered, 0, currentItem);
      setItems(copy);
      if (overedId !== currentItem.id) {
        dispatch(setBlocks(copy));
      }
    }
  };
  const onDropHandler = (e) => {
    const element = e;
    element.preventDefault();
    element.currentTarget.style.opacity = '1';
  };
  return (

    <div
      role="menu"
      tabIndex={0}
      className="work_space"
      onDrop={(e) => {
        e.preventDefault();
        if (onDragCurrent && onDragCurrent.type) {
          dispatch(setDragCurrent(null));
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onClick={(e) => { isActiveHandler(e); }}
      onKeyDown={(e) => { isActiveHandler(e); }}
    >
      {
        blocks.map(({ id, value, type }) => (
          type === 'image'
            ? (
              <FileWidget
                key={id}
                id={id}
                type={type}
                dragStartHandler={dragStartHandler}
                dragEndHandler={dragEndHandler}
                dragOverHandler={dragOverHandler}
                onDropHandler={onDropHandler}
              />
            )
            : (
              <TextWidget
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
        ))
      }
    </div>
  );
}

export { WorkSpace };
