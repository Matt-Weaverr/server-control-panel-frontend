import { Title } from '@solidjs/meta';
import './App.css';
import { FreeDraggableCard } from './components/draggable';
import ResizablePanel from './components/resize';

export default function App() {
  return (
        <>
          <Title>Solid App</Title>
          <FreeDraggableCard />
          <FreeDraggableCard />
          <ResizablePanel />
        </>
      )};
