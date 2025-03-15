import { useCallback, useEffect, useState, forwardRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./app.module.css";
import { Unlock } from "./pages/Unlock/Unlock";
import { useGetAccount, useGetLoginInfo } from "./hooks";
import { logout } from "@multiversx/sdk-dapp/utils";

// Explicitly cast Unity to allow it to be used as a JSX component
const UnityComponent = Unity as any;

export const Dashboard = () => {
  const { address } = useGetAccount();
  const { tokenLogin } = useGetLoginInfo();
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
    requestFullscreen,
    takeScreenshot,
    unload,
  } = useUnityContext({
    loaderUrl: "/unitybuild/crateclicker.loader.js",
    dataUrl: "/unitybuild/crateclicker.data",
    frameworkUrl: "/unitybuild/crateclicker.framework.js",
    codeUrl: "/unitybuild/crateclicker.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [screenshotDatas, setScreenshotDatas] = useState<string[]>([]);
  const [scores, setScores] = useState<[number, number][]>([]);

  const handleClickStartGame = (time: number) => {
    if (isLoaded === false || isPlaying === true) {
      return;
    }
    setIsPlaying(true);
    sendMessage("GameController", "StartGame", time);
  };

  const handleClickFullscreen = () => {
    if (isLoaded === false) {
      return;
    }
    requestFullscreen(true);
  };

  const handleClickScreenshot = () => {
    if (isLoaded === false) {
      return;
    }
    const screenshotData = takeScreenshot();
    if (screenshotData !== undefined) {
      setScreenshotDatas([screenshotData, ...screenshotDatas]);
    }
  };

  const handleClickUnload = async () => {
    if (isLoaded === false) {
      return;
    }
    try {
      await unload();
      console.log("Unload success");
    } catch (error) {
      console.error(`Unable to unload: ${error}`);
    }
  };

  const handleGameOver = useCallback(
    (...parameters: any[]) => {
      const time = Math.round(parameters[0] as number);
      const score = parameters[1] as number;
      setIsPlaying(false);
      setScores([[time, score], ...scores]);
      alert(
        "Game over for address: " +
          address +
          " with score: " +
          score +
          " and nativeAuth: " +
          tokenLogin?.nativeAuthToken
      );
    },
    [scores]
  );

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [handleGameOver, addEventListener, removeEventListener]);

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold mb-4">Crate Clicker!</h1>
      <div className={styles.unityWrapper}>
        {isLoaded === false && (
          <div className={styles.loadingBar}>
            <div
              className={styles.loadingBarFill}
              style={{ width: `${loadingProgression * 100}%` }}
            />
          </div>
        )}
        <UnityComponent
          unityProvider={unityProvider}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      </div>
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => handleClickStartGame(5)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Short Game
        </button>
        <button
          onClick={() => handleClickStartGame(10)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Long Game
        </button>
        <button
          onClick={handleClickFullscreen}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Fullscreen
        </button>
        <button
          onClick={handleClickScreenshot}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Screenshot
        </button>
        <button
          onClick={handleClickUnload}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Unload
        </button>
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-3">Scores</h2>
      <ul className="list-disc list-inside mb-4">
        {scores.map(([time, score]) => (
          <li key={time} className="text-lg">
            {score} points with {time} seconds left!
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-3">Screenshots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {screenshotDatas.map((data, index) => (
          <img
            width={250}
            key={index}
            src={data}
            alt="Screenshot"
            className="rounded shadow-md"
          />
        ))}
      </div>
      {!address ? (
        <Unlock />
      ) : (
        <div className="flex flex-col gap-2">
          <h1>Welcome {address}</h1>
          <p className="text-sm">
            NativeAuth:{" "}
            <span
              className="text-neutral-400"
              style={{
                wordBreak: "break-all",
              }}
            >
              {tokenLogin?.nativeAuthToken}
            </span>
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
