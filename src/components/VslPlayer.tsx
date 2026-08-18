"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Video file in /public. */
  src?: string;
  /** Poster frame shown before playback. */
  poster?: string;
  /**
   * Playback rate. The shipped file is already rendered at 1.25x, so the
   * default is 1 — setting 1.25 on top of it would play at ~1.56x.
   */
  rate?: number;
};

/**
 * VSL video player.
 *
 * Browsers reset playbackRate on source load and sometimes on play(), so the
 * rate is re-asserted on the relevant events.
 */
export function VslPlayer({
  src = "/educare-vsl-1.25x.mp4",
  poster = "/educare-vsl-poster.jpg",
  rate = 1,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const apply = () => {
      v.defaultPlaybackRate = rate;
      if (v.playbackRate !== rate) v.playbackRate = rate;
    };

    apply();
    v.addEventListener("loadedmetadata", apply);
    v.addEventListener("play", apply);
    return () => {
      v.removeEventListener("loadedmetadata", apply);
      v.removeEventListener("play", apply);
    };
  }, [rate]);

  return (
    <video
      ref={ref}
      className="h-full w-full"
      controls
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
