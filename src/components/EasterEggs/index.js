import { useEffect } from "react";
import AvengersAssemble from "./AvengersAssemble";
import SideEye from "./SideEye";
import { printConsoleCreed } from "./consoleCreed";
import "./index.css";

/** Easter eggs que valem para o site inteiro. Montado uma vez, junto da navbar. */
export default function EasterEggs() {
  useEffect(() => {
    printConsoleCreed();
  }, []);

  return (
    <>
      <AvengersAssemble />
      <SideEye />
    </>
  );
}
