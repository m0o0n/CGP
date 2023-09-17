import { useSelector } from 'react-redux';
import DefaultPhoto from '../../assets/default.png';

function Content() {
  const data = useSelector((state) => state.Constructor);
  const renderContent = (el) => {
    switch (el.type) {
      case 'image':
        return (
          <div key={el.id} className="content__image">
            <img src={el.value || DefaultPhoto} alt="team play" />
          </div>
        );
      case 'headline':
        return (
          <div key={el.id} className="content__headline">
            <h1>{el.value || 'Null'}</h1>
          </div>
        );
      case 'paragraph':
        return (
          <div key={el.id} className="content__paragraph">
            <p>
              {el.value || 'Null'}
            </p>
          </div>
        );
      case 'button':
        return (
          <div key={el.id} className="content__button">
            <button type="button">{el.value}</button>
          </div>
        );
      default:
        break;
    }
    return false;
  };
  return (
    <div className="content">
      {
                data.blocks.map((el) => renderContent(el))
            }
    </div>
  );
}

export { Content };
