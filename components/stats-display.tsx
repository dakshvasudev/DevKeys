interface StatsDisplayProps {
  wpm: number;
  accuracy: number;
  time: number;
}

export function StatsDisplay({ wpm, accuracy, time }: StatsDisplayProps) {
  return (
    <div className="flex gap-8 text-sm text-gray-400">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-mono text-primary">{wpm}</span>
        <span>WPM</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-mono text-primary">{accuracy}%</span>
        <span>accuracy</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-mono text-primary">{time}s</span>
        <span>time</span>
      </div>
    </div>
  );
}
