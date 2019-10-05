import React, { useState, useEffect, useCallback } from "react";

function App() {
  const canvasHeight = 800;
  const canvasWidth = 1000;
  const scale = Math.min(canvasHeight, canvasWidth) / 2.5;

  let [base, setBase] = useState(10);
  let [multiplier, setMultiplier] = useState(2);
  let [connections, setConnections] = useState([]);

  const getAngle = (x, base) => (x / base) * 2 * Math.PI;

  const getXY = useCallback(
    angle => ({
      x: Math.cos(angle) * scale + canvasWidth / 2,
      y: Math.sin(angle) * scale + canvasHeight / 2
    }),
    [scale, canvasWidth, canvasHeight]
  );

  const pointFactory = useCallback(
    (x, base) => {
      let angle = getAngle(x, base);
      return getXY(angle);
    },
    [getXY]
  );

  useEffect(() => {
    let newConnections = [];
    for (let i = 0; i < base; i++) {
      newConnections.push({
        p1: pointFactory(i + 1, base),
        p2: pointFactory((i + 1) * multiplier, base)
      });
    }
    setConnections(newConnections);
  }, [multiplier, base, scale, pointFactory]);

  return (
    <div className="App">
      <svg
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black;" }}
      >
        {connections.map((line, i) => (
          <line
            x2={line.p2.x}
            y2={line.p2.y}
            x1={line.p1.x}
            y1={line.p1.y}
            stroke-width="1"
            stroke="black"
            key={i}
          ></line>
        ))}
      </svg>
      <input
        type="number"
        value={base}
        onChange={e => setBase(parseInt(e.target.value))}
      />
      <input
        type="number"
        value={multiplier}
        step=".1"
        onChange={e => setMultiplier(parseFloat(e.target.value))}
      />
    </div>
  );
}

export default App;
