import { useState } from "react";
import { DndContext, useDraggable, useDroppable, DragEndEvent, closestCenter } from "@dnd-kit/core";

interface Frame {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
  resizing: boolean;
  initialWidth?: number;
  initialHeight?: number;
  resizeStartX?: number;
  resizeStartY?: number;
}

const Gallery = () => {
  const [frames, setFrames] = useState<Frame[]>([
    { id: 1, x: 10, y: 10, width: 150, height: 150, selected: false, resizing: false },
  ]);
  const [resizingFrame, setResizingFrame] = useState<number | null>(null);
  const [removeMode, setRemoveMode] = useState(false);

  const addFrame = () => {
    setFrames((prevFrames) => [
      ...prevFrames,
      { id: Date.now(), x: 10, y: 10, width: 150, height: 150, selected: false, resizing: false },
    ]);
  };

  const toggleRemoveMode = () => {
    setRemoveMode((prev) => !prev);
  };

  const removeFrame = (id: number) => {
    if (removeMode) {
      setFrames((prevFrames) => prevFrames.filter((frame) => frame.id !== id));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (resizingFrame !== null) return;

    const { active, delta } = event;
    const activeId = Number(active.id);

    setFrames((prevFrames) =>
      prevFrames.map((frame) =>
        frame.id === activeId
          ? frame.resizing ? frame : { ...frame, x: frame.x + delta.x, y: frame.y + delta.y }
          : frame
      )
    );
  };

  const startResizing = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;

    setFrames((prevFrames) =>
      prevFrames.map((frame) =>
        frame.id === id
          ? { ...frame, resizing: true, resizeStartX: startX, resizeStartY: startY, initialWidth: frame.width, initialHeight: frame.height }
          : frame
      )
    );
    setResizingFrame(id);
  };

  const stopResizing = () => {
    setFrames((prevFrames) =>
      prevFrames.map((frame) => ({ ...frame, resizing: false }))
    );
    setResizingFrame(null);
  };

  const handleResize = (event: React.MouseEvent) => {
    if (resizingFrame === null) return;

    setFrames((prevFrames) =>
      prevFrames.map((frame) => {
        if (frame.id !== resizingFrame || !frame.resizing) return frame;
        const deltaX = event.clientX - (frame.resizeStartX || 0);
        const deltaY = event.clientY - (frame.resizeStartY || 0);
        return {
          ...frame,
          width: Math.max(50, (frame.initialWidth || frame.width) + deltaX),
          height: Math.max(50, (frame.initialHeight || frame.height) + deltaY),
        };
      })
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center p-4 cursor-grabbing" onMouseMove={handleResize} onMouseUp={stopResizing}>
        <button
          onClick={addFrame}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Frame
        </button>
        <button
          onClick={toggleRemoveMode}
          className={`mb-4 px-4 py-2 rounded ${removeMode ? 'bg-red-700' : 'bg-red-500'} text-white`}
        >
          {removeMode ? "Exit Remove Mode" : "Toggle Remove Mode"}
        </button>
        <DroppableArea>
          {frames.map((frame) => (
            <DraggableFrame
              key={frame.id}
              frame={frame}
              removeFrame={removeFrame}
              startResizing={startResizing}
              isResizing={resizingFrame === frame.id}
              removeMode={removeMode}
            />
          ))}
        </DroppableArea>
      </div>
    </DndContext>
  );
};

const DroppableArea = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id: "gallery" });
  return (
    <div
      ref={setNodeRef}
      className="relative w-[800px] h-[600px] bg-gray-200 border border-gray-400 overflow-hidden"
    >
      {children}
    </div>
  );
};

interface DraggableFrameProps {
  frame: Frame;
  removeFrame: (id: number) => void;
  startResizing: (id: number, event: React.MouseEvent) => void;
  isResizing: boolean;
  removeMode: boolean;
}

const DraggableFrame = ({ frame, removeFrame, startResizing, isResizing, removeMode }: DraggableFrameProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: frame.id.toString(), disabled: isResizing });

  return (
    <div
      ref={setNodeRef}
      {...(!isResizing ? listeners : {})}
      {...attributes}
      onMouseDown={(e) => {
        e.stopPropagation();
        if (removeMode) removeFrame(frame.id);
      }}
      className="absolute bg-white border border-gray-500 shadow-md flex items-center justify-center text-center overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        left: `${frame.resizing ? frame.x : frame.x + (transform?.x || 0)}px`,
        top: `${frame.resizing ? frame.y : frame.y + (transform?.y || 0)}px`,
        width: frame.width,
        height: frame.height,
      }}
    >
      Frame {frame.id}
      <div
        onMouseDown={(e) => startResizing(frame.id, e)}
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
      />
    </div>
  );
};

export default Gallery;
