type Props = {
  type?: 'perTB' | 'perTBMonth' | 'perMillion' | 'perSCMillion'
}

export default function LoadingCurrency({ type }: Props) {
  switch (type) {
    case 'perTB':
      return <div className="animate-pulse">0.00/TB</div>
    case 'perTBMonth':
      return <div className="animate-pulse">0.00/TB/month</div>
    case 'perMillion':
      return <div className="animate-pulse">0.00/million</div>
    case 'perSCMillion':
      return <div className="animate-pulse">0.00 SC/million</div>
    default:
      return <div className="animate-pulse">0.00</div>
  }
}
