import { useDispatch } from 'react-redux';
import { ArrowDownIcon } from '../../icons/arrowDownIcon';
import { ArrowUpIcon } from '../../icons/arrowUpIcon';
import { CopyIcon } from '../../icons/copyIcon';
import { DropIcon } from '../../icons/dropIcon';
import { ImageIcon } from '../../icons/imageIcon';
import { deleteBlock, copyBlock, editBlock } from '../../store/constructorReducer';

function FileWidget({
  type,
  id,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  onDropHandler,
}) {
  const dispatch = useDispatch();
  return (
    <div
      className="work_space__item"
      data-id={id}
      draggable
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => onDropHandler(e)}
    >

      <div className="control">
        <div className="arrows">
          <span><ArrowDownIcon /></span>
          <span><ArrowUpIcon /></span>
        </div>
        <div className="actions">
          <span
            role="button"
            tabIndex={0}
            onClick={() => dispatch(copyBlock(id))}
            onKeyDown={() => dispatch(copyBlock(id))}
          >
            <CopyIcon />
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => dispatch(deleteBlock(id))}
            onKeyDown={() => dispatch(deleteBlock(id))}
          >
            <DropIcon />
          </span>
        </div>
      </div>

      <div className="widget">
        <ImageIcon />
        <span>{type}</span>
      </div>
      <div className="preset">
        <form onChange={(e) => {
          e.preventDefault();
          const file = URL.createObjectURL(
            Object.fromEntries([...new FormData(e.currentTarget)]).file,
          );
          dispatch(editBlock({ id, value: file }));
        }}
        >
          <input
            type="file"
            name="file"
          />
        </form>
      </div>
    </div>
  );
}

export { FileWidget };
