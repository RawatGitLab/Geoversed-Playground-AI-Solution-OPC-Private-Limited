/**
 * Video Memory & Playback Manager for iOS / Safari / Mobile
 * - Enforces single active video playback (pauses all other videos when one plays)
 * - Pauses off-screen videos via IntersectionObserver to save GPU memory and hardware decoders
 */

const registeredVideos = new Set<HTMLVideoElement>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!observer && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          // If less than 20% visible or hidden, pause immediately
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: [0, 0.2, 0.5],
      }
    );
  }
  return observer!;
}

export function registerVideo(video: HTMLVideoElement | null): () => void {
  if (!video) return () => {};

  registeredVideos.add(video);

  // Pause other videos when this one plays
  const handlePlay = () => {
    registeredVideos.forEach((other) => {
      if (other !== video && !other.paused) {
        other.pause();
      }
    });
  };

  video.addEventListener('play', handlePlay);

  const obs = getObserver();
  if (obs) {
    obs.observe(video);
  }

  // Cleanup function
  return () => {
    video.removeEventListener('play', handlePlay);
    if (obs) {
      obs.unobserve(video);
    }
    registeredVideos.delete(video);
  };
}
