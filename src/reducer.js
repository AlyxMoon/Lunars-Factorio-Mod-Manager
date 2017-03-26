import {Map} from 'immutable'

import * as Profiles from './profiles'
import * as InstalledMods from './installedMods'

export default function reducer (state = Map(), action) {
  switch (action.type) {
    case 'SET_ROUTES':
      return Profiles.setRoutes(state, action.routes)
    case 'SET_ACTIVE_TAB':
      return Profiles.setActiveTab(state, action.tab)
    case 'SET_PROFILES':
      return Profiles.setProfiles(state, action.profiles)
    case 'SET_ACTIVE_PROFILE':
      return Profiles.setActiveProfile(state, action.activeProfile)
    case 'ADD_PROFILE':
      return Profiles.addProfile(state)
    case 'RENAME_PROFILE':
      return Profiles.renameProfile(state, action.index, action.name)
    case 'DELETE_PROFILE':
      return Profiles.deleteProfile(state, action.index)
    case 'MOVE_PROFILE_UP':
      return Profiles.moveProfileUp(state, action.index)
    case 'MOVE_PROFILE_DOWN':
      return Profiles.moveProfileDown(state, action.index)
    case 'TOGGLE_MOD_STATUS':
      return Profiles.toggleModStatus(state, action.profileIndex, action.modIndex)

    case 'SET_INSTALLED_MODS':
      return InstalledMods.setInstalledMods(state, action.installedMods)
    case 'SET_SELECTED_INSTALLED_MOD':
      return InstalledMods.setSelectedInstalledMod(state, action.selectedInstalledMod)
    case 'DELETE_INSTALLED_MOD':
      return InstalledMods.deleteInstalledMod(state, action.index)
  }
  return state
}
