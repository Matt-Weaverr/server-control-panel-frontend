import { createSignal } from "solid-js";

export function FreeDraggableCard() {
  const [pos, setPos] = createSignal({ x: 100, y: 100 });
  const [width, setWidth] = createSignal(100);
  const [height, setHeight] = createSignal(100);
  const [isResizing, setIsResizing] = createSignal(false);
  const [hoveringCorner, setHoveringCorner] = createSignal({ is: false, corner: ""});
  const [isDragging, setIsDragging] = createSignal(false);
  let dragOffset = { x: 0, y: 0 };
  let corners = {
    tl: { x: 100, y: 100 },
    tr: { x: 200, y: 100 },
    bl: { x: 100, y: 200 },
    br: { x: 200, y: 200 }
  };

  const onPointerDown = (e: PointerEvent) => {
    const target = e.currentTarget as HTMLElement;


    setIsDragging(true);

    target.setPointerCapture(e.pointerId);
    dragOffset = {
      x: e.clientX - pos().x,
      y: e.clientY - pos().y
    };
  };

  const onPointerMove = (e: PointerEvent) => {
    if (isDragging()) {
      setPos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
    if (isResizing()) {
      // Handle resizing logic here
    }
    if ((corners.tl.x <= e.clientX && e.clientX <= (corners.tl.x +10)) && (corners.tl.y <= e.clientY && e.clientY <= (corners.tl.y + 10)) ||
        (corners.br.x >= e.clientX && e.clientX >= (corners.br.x - 10)) && (corners.bl.y >= e.clientY && e.clientY >= (corners.bl.y - 10))
      ) {
        setHoveringCorner({ is: true, corner: "nwse" });
    } else if ((corners.tr.x >= e.clientX && e.clientX >= (corners.tr.x - 10)) && (corners.tr.y <= e.clientY && e.clientY <= (corners.tr.y + 10)) || 
               (corners.bl.x <= e.clientX && e.clientX <= (corners.bl.x + 10)) && (corners.bl.y >= e.clientY && e.clientY >= (corners.bl.y - 10))  
    ) {
      setHoveringCorner({ is: true, corner: "nesw" });
    } else {
      setHoveringCorner({ is: false, corner: "" });
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    setIsDragging(false);
    setIsResizing(false);
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    corners = {
      tl: { x: rect.left, y: rect.top },
      tr: { x: rect.right, y: rect.top },
      bl: { x: rect.left, y: rect.bottom },
      br: { x: rect.right, y: rect.bottom }
    };

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
        width: `${width()}px`,
        height: `${height()}px`,
        padding: "16px 24px",
        background: isDragging() ? "#2563eb" : "#3b82f6",
        color: "#ffffff",
        "border-radius": "8px",
        "user-select": "none",
        cursor: hoveringCorner().is ? `${hoveringCorner().corner}-resize` : "default",
        "box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      Drag Me Anywhere
    </div>
  );
}