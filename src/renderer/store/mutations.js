export const SET_APP_STATUS = (state, { firstTime }) => {
  state.appStatus.firstTime = firstTime
}

export const SET_PLAYER_USERNAME = (state, { username }) => {
  state.username = username
}

export const SET_INSTALLED_MODS = (state, { installedMods }) => {
  state.installedMods = installedMods
}

export const SET_ONLINE_MODS = (state, { onlineMods }) => {
  state.onlineMods = onlineMods
}

export const SET_SAVES = (state, { saves = null } = {}) => {
  state.saves = saves
  state.selectedSave = null
}

export const SET_ACTIVE_PROFILE = (state, { profileSelected }) => {
  state.profileSelected = profileSelected
}

export const SET_PROFILES = (state, { profiles }) => {
  state.profiles = profiles
}

export const SET_CURRENT_ONLINE_MOD_FILTER = (state, payload) => {
  state.onlineModsCurrentFilter = payload.onlineModsCurrentFilter
  state.onlineModsPage = 0
}

export const SET_CURRENT_ONLINE_MOD_SORT = (state, payload) => {
  state.onlineModsCurrentSort = payload.onlineModsCurrentSort
  state.onlineModsPage = 0
}

export const SET_SELECTED_MOD = (state, payload) => {
  state.selectedMod = payload.selectedMod
}

export const SET_SELECTED_ONLINE_MOD = (state, payload) => {
  state.selectedOnlineMod = payload.selectedOnlineMod
  state.fetchingOnlineMod = false
}

export const SET_SELECTED_SAVE = (state, { selected = null } = {}) => {
  state.selectedSave = selected
}

export const SET_ONLINE_MODS_PAGE = (state, payload) => {
  state.onlineModsPage = payload.onlineModsPage
}

export const SET_ONLINE_QUERY = (state, payload) => {
  state.onlineQuery = payload.onlineQuery
  state.onlineModsPage = 0
}

export const SET_FETCHING_ONLINE_MOD = (state, { fetching = false } = {}) => {
  state.fetchingOnlineMod = fetching
}

export const SHOW_MODAL = (state, { name = '', options = {} } = {}) => {
  for (const modal in state.modals) {
    state.modals[modal] = modal === name
      ? { show: true, ...options }
      : { show: false }
  }
}

export const HIDE_MODAL = (state) => {
  for (const modal in state.modals) {
    state.modals[modal] = { show: false }
  }
}

export const SET_APP_LATEST_VERSION = (state, { version }) => {
  state.appLatestVersion = version
}

export const UPDATE_OPTIONS = (state, { options }) => {
  state.options = Object.assign({}, state.options, options)
}

export const UPDATE_FACTORIO_PATHS = (state, { paths }) => {
  state.paths = Object.assign({}, state.paths, paths)
}
