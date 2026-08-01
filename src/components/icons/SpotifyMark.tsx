export default function SpotifyMark({ width = 44 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={width}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Spotify"
    >
      <mask id="spotify-cutout">
        <rect width="24" height="24" fill="#fff" />
        <path
          d="M6.3,16.1 Q12,13.1 17.7,16.1"
          stroke="#000"
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M7.4,12.7 Q12,10 16.6,12.7"
          stroke="#000"
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8.5,9.5 Q12,7.2 15.5,9.5"
          stroke="#000"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </mask>
      <circle cx="12" cy="12" r="11" fill="#F7F6F3" mask="url(#spotify-cutout)" />
    </svg>
  );
}
