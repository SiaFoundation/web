export function LoadingDots() {
  return (
    <div className="flex gap-1">
      <Dot />
      <Dot />
      <Dot />
    </div>
  )
}

function Dot() {
  return (
    <div className="w-1 h-1 bg-slate-400 dark:bg-slate-200 rounded-full animate-pulselight [&:nth-child(2)]:animation-delay-500 [&:nth-child(3)]:animation-delay-1000" />
  )
}
