import { createSignal } from "solid-js";

export function FreeDraggableCard() {
  const [pos, setPos] = createSignal({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = createSignal(false);
  let dragOffset = { x: 0, y: 0 };

  const onPointerDown = (e: PointerEvent) => {
    setIsDragging(true);

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    dragOffset = {
      x: e.clientX - pos().x,
      y: e.clientY - pos().y
    };
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging()) return;
    setPos({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const onPointerUp = (e: PointerEvent) => {
    setIsDragging(false);
    const target = e.currentTarget as HTMLElement;
    target.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "absolute",
        left: `${pos().x}px`,
        top: `${pos().y}px`,
        padding: "16px 24px",
        background: isDragging() ? "#2563eb" : "#3b82f6",
        color: "#ffffff",
        "border-radius": "8px",
        "user-select": "none",
        cursor: isDragging() ? "grabbing" : "grab",
        "box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      Drag Me Anywhere
    </div>
  );
}