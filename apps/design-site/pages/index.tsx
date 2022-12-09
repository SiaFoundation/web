import { Buttons } from '../sections/Buttons'
import { Typography } from '../sections/Typography'
import { Layout } from '../sections/Layout'
import { Menus } from '../sections/Menus'
import { Inputs } from '../sections/Inputs'
import { ControlGroups } from '../sections/ControlGroups'
import { Images } from '../sections/Images'
import { Indicators } from '../sections/Indicators'
import { Popups } from '../sections/Popups'
import { Skeletons } from '../sections/Skeletons'
import { Dialogs } from '../sections/Dialogs'

export function IndexPage() {
  return (
    <>
      <Typography />
      <Images />
      <Layout />
      <Buttons />
      <Inputs />
      <Indicators />
      <Menus />
      <ControlGroups />
      <Dialogs />
      <Popups />
      <Skeletons />
    </>
  )
}

export default IndexPage
