import React, {
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import sublinks from './data'

type Location = {
  center: number
  bottom: number
}

type State = {
  isSidebarOpen: boolean
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
  isSubmenuOpen: boolean
  setIsSubmenuOpen: Dispatch<SetStateAction<boolean>>
  openSidebar: () => void
  closeSidebar: () => void
  openSubmenu: (page: string, location: Location) => void
  closeSubmenu: () => void
  location: Location
  page: Page
}

type Props = {
  children: ReactNode
}

type Link = {
  label: string
  icon: JSX.Element
  url: string
}

type Page = {
  page: string
  links: Link[]
}

const AppContext = React.createContext<State>({} as State)
export const AppProvider = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [location, setLocation] = useState<Location>({} as Location)
  const [page, setPage] = useState<Page>({ page: '', links: [] })

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSubmenu = (
    text: string,
    coordinates: { center: number; bottom: number },
  ) => {
    const page = sublinks.find((link) => link.page === text)
    if (page) {
      setPage(page)
      setLocation(coordinates)
      setIsSubmenuOpen(true)
    }
  }
  const closeSubmenu = () => {
    setIsSubmenuOpen(false)
  }

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isSubmenuOpen,
        setIsSubmenuOpen,
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
        location,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
