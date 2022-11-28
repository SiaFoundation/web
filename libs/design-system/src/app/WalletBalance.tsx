import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { useWalletBalance } from '@siafoundation/react-core'
import { humanSiacoin } from '@siafoundation/sia-js'

export function WalletBalance() {
  const { data: siacoin } = useWalletBalance()

  if (!siacoin) {
    return null
  }

  return (
    <Panel className="hidden sm:block h-7 px-4">
      <Text size="12" weight="semibold">
        {humanSiacoin(siacoin)}
      </Text>
    </Panel>
  )
}

// export function WalletBalance() {
//   const { data: wallet } = useWalletBalance()

//   if (!wallet) {
//     return null
//   }

//   return (
//     <Panel
//       className="hidden sm:block"
//     >
//       <div className="flex items-center h-7 px-4">
//         <Text size="12" weight="semibold">
//           {humanSiacoin(wallet.siacoins)}
//         </Text>
//         {!!wallet.siafunds && (
//           <>
//             <Separator orientation="vertical" className="h-full" />
//             <Text size="12" weight="semibold">
//               {humanSiafund(wallet.siafunds)}
//             </Text>
//           </>
//         )}
//       </div>
//     </Panel>
//   )
// }
