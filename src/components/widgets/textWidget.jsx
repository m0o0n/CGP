import { useDispatch } from 'react-redux';
import { ArrowDownIcon } from '../../icons/arrowDownIcon';
import { ArrowUpIcon } from '../../icons/arrowUpIcon';
import { ButtonIcon } from '../../icons/buttonIcon';
import { CopyIcon } from '../../icons/copyIcon';
import { DropIcon } from '../../icons/dropIcon';
import { HeadLineIcon } from '../../icons/headLineIcon';
import { ParagraphIcon } from '../../icons/paragraphIcon';
import { deleteBlock, copyBlock, editBlock } from '../../store/constructorReducer';

function TextWidget({
  type,
  textValue,
  id,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  onDropHandler,
}) {
  const dispatch = useDispatch();

  const renderIcon = () => {
    switch (type) {
      case 'headline':
        return <HeadLineIcon />;
      case 'paragraph':
        return <ParagraphIcon />;
      case 'button':
        return <ButtonIcon />;
      default:
        break;
    }
    return false;
  };

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
        {
          renderIcon()
        }
        <span>{type}</span>
      </div>
      <div className="preset">
        <form>
          <textarea
            value={textValue}
            onChange={
              (e) => {
                dispatch(editBlock({ id, value: e.target.value }));
              }
            }
            name="text"
          />
        </form>
      </div>
    </div>
  );
}

export { TextWidget };
