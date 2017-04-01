export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_PLAYLISTS_ERROR':
    case 'GET_SUBSCRIPTIONS_ERROR':
    case 'GET_CHANNEL_VIDEOS_ERROR':
    case 'QUEUE_PUSH_PLAYLIST_ERROR':
    case 'GET_PLAYLIST_ITEMS_ERROR':
    case 'SEARCH_VIDEOS_ERROR':
    case 'QUEUE_PUSH_ERROR':
    case 'OAUTH_FAILURE':
    case 'LINK_FAILURE':
    case 'UNLINK':
      return {
        className: 'notification--active',
        message: action.notification
      }

    case 'CLEAR_NOTIFICATIONS':
      return {}

    default:
      return state
  }
}
