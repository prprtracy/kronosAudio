export type ResponsiveImagePosition = {
  imagePositionDesktop?: string;
  imagePositionMobile?: string;
};

export const responsiveObjectPositionClass =
  "[object-position:var(--image-position-mobile)] md:[object-position:var(--image-position-desktop)]";

export function imagePositionStyle(position?: ResponsiveImagePosition) {
  return {
    "--image-position-desktop":
      position?.imagePositionDesktop ?? "center center",
    "--image-position-mobile":
      position?.imagePositionMobile ??
      position?.imagePositionDesktop ??
      "center center",
  } as CSSProperties;
}

const positionsBySrc: Record<string, ResponsiveImagePosition> = {
  "/media/discovery_001.jpg": {
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
  },
  "/media/Disvo.jpg": {
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
  },
  "/media/products/Discovery/discovery1.jpg": {
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
  },
  "/media/products/Discovery/discovery13.jpeg": {
    imagePositionDesktop: "50% 55%",
    imagePositionMobile: "50% 55%",
  },
  "/media/tonearm_0.jpg": {
    imagePositionDesktop: "50% 50%",
    imagePositionMobile: "50% 50%",
  },
  "/media/products/tonearm/RS_0.jpg": {
    imagePositionDesktop: "50% 50%",
    imagePositionMobile: "50% 50%",
  },
  "/media/products/tonearm/RS_1.jpg": {
    imagePositionDesktop: "50% 50%",
    imagePositionMobile: "50% 50%",
  },
  "/media/products/tonearm/RS_2.jpg": {
    imagePositionDesktop: "50% 50%",
    imagePositionMobile: "50% 50%",
  },
  "/media/pro_000.jpg": {
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
  },
  "/media/perpetual_000.jpg": {
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
  },
  "/media/products/Sparta/sparta_0.jpg": {
    imagePositionDesktop: "50% 52%",
    imagePositionMobile: "50% 52%",
  },
};

export function getImagePosition(src?: string): ResponsiveImagePosition {
  return src ? positionsBySrc[src] ?? {} : {};
}

export function mergeImagePosition(
  src?: string,
  position?: ResponsiveImagePosition
): ResponsiveImagePosition {
  return {
    ...getImagePosition(src),
    ...position,
  };
}
import type { CSSProperties } from "react";
