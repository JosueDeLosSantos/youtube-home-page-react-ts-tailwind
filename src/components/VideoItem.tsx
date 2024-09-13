import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

type VideoItemProps = {
  id: string;
  title: string;
  channel: {
    name: string;
    id: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};
export function VideoItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoItemProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;
    if (videoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [videoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setVideoPlaying(true)}
      onMouseLeave={() => setVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={`block size-full object-cover transition-[border-radius] duration-200 ${videoPlaying ? "rounded-none" : "rounded-xl"}`}
        />
        <div className="absolute bottom-1 right-1 rounded bg-secondary-dark px-0.5 text-sm text-secondary">
          {formatDuration(duration)}
        </div>
        <video
          className={`absolute inset-0 block aspect-video h-full object-cover transition-opacity duration-200 ${videoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        />
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="shrink-0">
          <img className="size-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-sm text-secondary-text">
            {channel.name}
          </a>
          <div className="text-sm text-secondary-text">
            {VIEW_FORMATTER.format(views)} views · {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
