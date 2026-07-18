// Selo CX da Clickmax — o único elemento cromático do sistema também é a marca.
// (glifo "CX" oficial; o trocadilho MX ↔ CX vem do selo + o wordmark "MX Check".)
export function CxMark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 115.5556 115.5556" className={className} aria-hidden="true">
      <circle cx="57.7778" cy="57.7778" r="57.7778" fill="#e4f222" />
      <g fill="#232c19">
        <path d="M46.6512 62.139L52.3008 63.6301C50.6729 67.4781 47.4172 71.7108 40.4749 71.7108C30.5641 71.7108 27.6914 63.7744 27.6914 58.3392C27.6914 52.9039 30.5641 45.0156 40.4749 45.0156C47.7045 45.0156 50.8644 49.1522 52.3487 53.3849L46.6033 54.7317C45.55 51.8457 44.2094 49.8256 40.4749 49.8256C35.9743 49.8256 33.6762 53.5292 33.6762 58.3392C33.6762 63.1972 35.8786 66.8528 40.4749 66.8528C43.9221 66.8528 45.5978 64.6402 46.6512 62.139Z" />
        <path d="M63.7847 57.8941L55.9156 45.5163H62.8991L70.4772 57.8941L62.4626 70.1456H55.4792L63.7847 57.8941Z" />
        <path d="M77.1696 57.7678L85.0387 70.1456L78.0553 70.1456L70.4772 57.7678L78.4917 45.5163H85.4751L77.1696 57.7678Z" />
      </g>
    </svg>
  );
}
