type Props = {
  children: React.ReactNode
}

export default function Italic({ children }: Props) {
  return <span className="italic">{children}</span>
}
