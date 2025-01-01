import { common, createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";

const lowlight = createLowlight(common);
// Register languages
lowlight.register("html", xml);
lowlight.register("css", css);
lowlight.register("js", javascript);
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("ts", typescript);
lowlight.register("python", python);
lowlight.register("bash", bash);
lowlight.register("sh", bash);

const useLowlight = () => {
  return lowlight;
};

export default useLowlight;
