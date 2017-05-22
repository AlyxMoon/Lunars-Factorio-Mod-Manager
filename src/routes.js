import {ProfilesContainer} from './components/Profiles/Profiles'
import {InstalledModsContainer} from './components/InstalledMods/InstalledMods'
import {OnlineModsContainer} from './components/OnlineMods/OnlineMods'
import {SettingsContainer} from './components/Settings/Settings'
import {AboutContainer} from './components/About/About'

export const routes = [
  {
    name: 'Profiles',
    pathname: '/',
    component: ProfilesContainer
  },
  {
    name: 'Installed Mods',
    pathname: '/installedMods',
    component: InstalledModsContainer
  },
  {
    name: 'Online Mods',
    pathname: '/onlineMods',
    component: OnlineModsContainer
  },
  {
    name: 'Settings',
    pathname: '/settings',
    component: SettingsContainer
  },
  {
    name: 'About',
    pathname: '/about',
    component: AboutContainer
  }
]
