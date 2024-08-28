/* @refresh reload */
import './index.css';
import App from './App';
import {activeElement, Config, createRenderer, loadFonts} from "@lightningtv/solid";
import {createEffect, on, onMount} from "solid-js";
import fonts from "./fonts";
import {useFocusManager} from "@lightningtv/solid/primitives";

Config.debug = true;
Config.fontSettings.fontFamily = "Roboto";
Config.fontSettings.color = 0xffffffff;
Config.rendererOptions = {
  numImageWorkers: 2,
  // Set the resolution based on window height
  // 720p = 0.666667, 1080p = 1, 1440p = 1.5, 2160p = 2
  /*
    deviceLogicalPixelRatio: window.innerHeight / 1080,
    appWidth: 1920,
    appHeight: 1080,
  */
  appWidth: 1280,
  appHeight: 720,
  deviceLogicalPixelRatio: 2 / 3,
  enableInspector: true,
  // Increase to preload images coming from offscreen
  boundsMargin: 20,
};
Config.focusDebug = true;

createEffect(on(activeElement, (elm) => {
  console.log('active element fired: ', elm);
}, {defer: true}));

const {render} = createRenderer();
loadFonts(fonts);

const p = render(() => {
  useFocusManager();

  onMount(() => {
    console.log('mounted app');
  })
  return <App/>
});

console.log(p);
