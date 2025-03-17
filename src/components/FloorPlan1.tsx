import { useState, useEffect, useRef } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { restrictToBoundingRect } from "@dnd-kit/modifiers";


interface TableProps {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface SeatProps {
  id: number;
  x: number;
  y: number;
}

function DraggableTable({ table, onRemove, isRemoveMode }: { table: TableProps; onRemove?: (id: number) => void; isRemoveMode: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `table-${table.id}`
  });

  const wasMoved = useRef(false);

  const handleMouseDown = () => { wasMoved.current = false; };
  const handleMouseUp = () => {
    console.log(`Mouse Up on Table ${table.id}, wasMoved: ${wasMoved.current}, isRemoveMode: ${isRemoveMode}`);
    
    if (!wasMoved.current && isRemoveMode) {
      console.log(`Removing Table ID: ${table.id}`);
      if (onRemove) {
        onRemove(table.id);
      }
    }
  };
  

  const style: React.CSSProperties = {
    position: 'absolute',
    top: transform ? table.y + transform.y : table.y,
    left: transform ? table.x + transform.x : table.x,
    width: `${table.size}px`,
    height: `${table.size}px`,
    borderRadius: '50%',
    backgroundColor: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    cursor: isRemoveMode ? 'pointer' : 'move'
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onPointerMove={() => { wasMoved.current = true; }}
    >
      Table
    </div>
  );
}

function DraggableSeat({ seat, onRemove, isRemoveMode }: { seat: SeatProps; onRemove?: (id: number) => void; isRemoveMode: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `seat-${seat.id}`
  });

  const wasMoved = useRef(false);

  const handleMouseDown = () => { wasMoved.current = false; };
  const handleMouseUp = () => {
    console.log(`Mouse Up on Seat ${seat.id}, wasMoved: ${wasMoved.current}, isRemoveMode: ${isRemoveMode}`);
    
    if (!wasMoved.current && isRemoveMode) {
      console.log(`Removing Seat ID: ${seat.id}`);
      if (onRemove) {
        onRemove(seat.id);
      }
    }
  };
  

  const style: React.CSSProperties = {
    position: 'absolute',
    top: transform ? seat.y + transform.y : seat.y,
    left: transform ? seat.x + transform.x : seat.x,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'red',
    border: '2px solid white',
    cursor: isRemoveMode ? 'pointer' : 'move'
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onPointerMove={() => { wasMoved.current = true; }}
    ></div>
  );
}

export default function SeatingArrangement() {
  const [tables, setTables] = useState<TableProps[]>([]);
  const [seats, setSeats] = useState<SeatProps[]>([]);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isRemoveMode, setIsRemoveMode] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('seatingArrangement');
    if (savedData) {
      const { tables, seats } = JSON.parse(savedData);
      setTables(tables);
      setSeats(seats);
    }
  }, []);

  const saveArrangement = () => {
    const data = JSON.stringify({ tables, seats });
    localStorage.setItem('seatingArrangement', data);
    setIsEditMode(false);
    setIsRemoveMode(false);
  };

  const addTable = () => {
    if (!isEditMode) return;
    const newTable: TableProps = { id: Date.now(), x: 200, y: 200, size: 150 };
    setTables((prev) => [...prev, newTable]);
  };

  const addSeat = () => {
    if (!isEditMode) return;
    const newSeat: SeatProps = { id: Date.now(), x: 300, y: 300 };
    setSeats((prev) => [...prev, newSeat]);
  };

  const removeTable = (id: number) => setTables((prev) => prev.filter((table) => table.id !== id));
  const removeSeat = (id: number) => setSeats((prev) => prev.filter((seat) => seat.id !== id));

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isEditMode) return;
    const { active, delta } = event;
    const floorplan = document.getElementById("floorplan"); // Get the floorplan container
  
    if (!floorplan) return;
  
    const floorplanRect = floorplan.getBoundingClientRect(); // Get container boundaries
  
    if (active.id.toString().startsWith("table")) {
      setTables((prevTables) =>
        prevTables.map((table) => {
          if (`table-${table.id}` === active.id) {
            // Calculate new positions relative to the container
            let newX = table.x + delta.x;
            let newY = table.y + delta.y;
  
            // Keep the table fully inside the container
            newX = Math.max(0, Math.min(newX, floorplanRect.width - table.size));
            newY = Math.max(0, Math.min(newY, floorplanRect.height - table.size));
  
            return { ...table, x: newX, y: newY };
          }
          return table;
        })
      );
    } else if (active.id.toString().startsWith("seat")) {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => {
          if (`seat-${seat.id}` === active.id) {
            // Calculate new positions relative to the container
            let newX = seat.x + delta.x;
            let newY = seat.y + delta.y;
  
            // Keep the seat fully inside the container (size = 40px)
            newX = Math.max(0, Math.min(newX, floorplanRect.width - 40));
            newY = Math.max(0, Math.min(newY, floorplanRect.height - 40));
  
            return { ...seat, x: newX, y: newY };
          }
          return seat;
        })
      );
    }
  };
  
  
  
  const { setNodeRef } = useDroppable({ id: 'floorplan' });

  return (
    <DndContext 
        onDragEnd={handleDragEnd} 
        modifiers={[restrictToBoundingRect]}
      >

      <div id="floorplan" ref={setNodeRef} className="relative w-full h-screen border border-gray-300">
        {tables.map((table) => (
          <DraggableTable key={table.id} table={table} onRemove={removeTable} isRemoveMode={isRemoveMode} />
        ))}
        {seats.map((seat) => (
          <DraggableSeat key={seat.id} seat={seat} onRemove={removeSeat} isRemoveMode={isRemoveMode} />
        ))}

        {isEditMode && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button onClick={addTable} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Table</button>
            <button onClick={addSeat} className="px-4 py-2 bg-red-500 text-white rounded-md">Add Seat</button>
            <button onClick={() => setIsRemoveMode(!isRemoveMode)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">
              {isRemoveMode ? 'Exit Remove Mode' : 'Remove Mode'}
            </button>
            <button onClick={saveArrangement} className="px-4 py-2 bg-gray-500 text-white rounded-md">Save</button>
          </div>
        )}

        {!isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            className="absolute bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Edit Mode
          </button>
        )}
      </div>
    </DndContext>
  );
}