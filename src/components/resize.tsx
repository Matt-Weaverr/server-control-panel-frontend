import { createSignal, onCleanup } from "solid-js";

export default function ResizablePanel() {
  const [width, setWidth] = createSignal(300);
  const [isHandleHovered, setIsHandleHovered] = createSignal(false);
  let isResizing = false;

  const startResize = (e: MouseEvent) => {
    isResizing = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  };

  const resize = (e: MouseEvent) => {
    if (!isResizing) return;
    // Constrain minimum width to 100px and maximum width to 800px
    const newWidth = Math.max(100, Math.min(800, e.clientX));
    setWidth(newWidth);
  };

  const stopResize = () => {
    isResizing = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  onCleanup(() => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  });

  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            width: `${width()}px`,
            background: "#f0f0f0",
            "border-right": "1px solid #ccc",
            padding: "1rem",
          }}>

          <h3>Resizable Panel</h3>
          <p>Current width: {width()}px</p>
        </div>

        <div
          onMouseDown={startResize}
          onMouseEnter={() => setIsHandleHovered(true)}
          onMouseLeave={() => setIsHandleHovered(false)}
          style={{
            width: "6px",
            cursor: "col-resize",
            background: isHandleHovered() ? "#999" : "#ddd",
          }}
        />
      </div>
    </>
  );
}