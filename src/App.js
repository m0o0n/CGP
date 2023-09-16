import './App.scss';
import { Content } from './components/content/content';
import { ToolBar } from './components/toolBar/toolBar';
import { WorkSpace } from './components/workSpace/workSpace';

function App() {
  return (
    <div className='wrapper'>
      <ToolBar />
      <WorkSpace />
      <Content />
    </div>
  );
}

export default App;
