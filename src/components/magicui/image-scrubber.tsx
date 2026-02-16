"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

type ImageScrubberProps = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function ImageScrubber({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: ImageScrubberProps) {
  return (
    <ReactCompareSlider
      boundsPadding={0}
      itemOne={
        <ReactCompareSliderImage
          src={before}
          alt={beforeLabel}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={after}
          alt={afterLabel}
        />
      }
      className="my-8 rounded-lg overflow-hidden"
    />
  );
}
