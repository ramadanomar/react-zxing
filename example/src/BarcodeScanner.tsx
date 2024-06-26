import { useState } from "react";
import { useZxing } from "react-zxing";

import { useMediaDevices } from "react-media-devices";

export const BarcodeScanner: React.FC<{}> = () => {
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  const { devices } = useMediaDevices();

  const {
    ref,
    torch: {
      on: torchOn,
      off: torchOff,
      isOn: isTorchOn,
      isAvailable: isTorchAvailable,
    },
  } = useZxing({
    paused,
    onDecodeResult(result) {
      setResult(result.getText());
    },
    onDecodeError(error) {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onError(error) {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
      <ul>
        {devices?.map((device) => (
          <li key={device.id}>{device.label}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={() => {
            if (isTorchOn) {
              torchOff();
            } else {
              torchOn();
            }
          }}
          disabled={!isTorchAvailable}
        >
          {isTorchOn ? "Disable" : "Enable"} torch
        </button>
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      </div>
    </>
  );
};
