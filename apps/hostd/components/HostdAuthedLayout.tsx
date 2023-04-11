import { AppAuthedLayout } from '@siafoundation/design-system'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function HostdAuthedLayout(props: Omit<Props, 'appName'>) {
  return <AppAuthedLayout appName="renterd" {...props} />
}

// export function HostdAuthedLayout({
//   children,
//   title,
//   nav,
//   actions,
//   size,
// }: Props) {
//   const { openDialog } = useDialog()

//   return (
//     <Providers>
//       <AppAuthedLayout
//         appName="hostd"
//         title={title}
//         openSettings={() => openDialog('settings')}
//         routes={routes}
//         sidenav={
//           <>
//             <SidenavItem title="Dashboard" route={routes.home}>
//               <HouseIcon />
//             </SidenavItem>
//             <SidenavItem title="Storage" route={routes.storage.index}>
//               <HardDriveIcon />
//             </SidenavItem>
//             <SidenavItem title="Contracts" route={routes.contracts.index}>
//               <FileContractIcon />
//             </SidenavItem>
//             <SidenavItem title="Configuration" route={routes.config.index}>
//               <BarsProgressIcon />
//             </SidenavItem>
//           </>
//         }
//         actions={actions}
//         nav={nav}
//         size={size}
//       >
//         {children}
//       </AppAuthedLayout>
//     </Providers>
//   )
// }
