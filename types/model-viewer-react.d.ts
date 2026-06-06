import type { ModelViewerElement } from "@google/model-viewer";
import type { DOMAttributes } from "react";

type ModelViewerAttributes = DOMAttributes<ModelViewerElement> &
  Pick<React.HTMLAttributes<HTMLElement>, "className" | "style" | "id"> & {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "manual";
  "camera-controls"?: boolean | "";
  "auto-rotate"?: boolean | "";
  "auto-rotate-delay"?: number | string;
  "rotation-per-second"?: string;
  "shadow-intensity"?: number | string;
  "shadow-softness"?: number | string;
  exposure?: number | string;
  "environment-image"?: string;
  "skybox-image"?: string;
  "camera-target"?: string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "touch-action"?: string;
  ar?: boolean | "";
  "ar-modes"?: string;
  "interaction-prompt"?: "auto" | "when-focused" | "none";
  ref?: React.Ref<ModelViewerElement>;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}
