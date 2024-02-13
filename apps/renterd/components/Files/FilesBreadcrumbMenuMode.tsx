import { LinkButton } from '@siafoundation/design-system'
import { Earth16, Folder16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../../contexts/filesManager'

export function FilesBreadcrumbMenuMode() {
  const { switchViewModeUrl, activeViewMode } = useFilesManager()

  return (
    <LinkButton
      href={switchViewModeUrl}
      tip={
        activeViewMode === 'directory'
          ? 'Viewing directory explorer'
          : 'Viewing all bucket files'
      }
    >
      {activeViewMode === 'directory' ? <Folder16 /> : <Earth16 />}
    </LinkButton>
  )
}
