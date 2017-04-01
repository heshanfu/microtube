const initialState = {
  form: false,
  isVisible: false,
  promptText: '',
  confirmText: '',
  cancelText: '',
  callback: () => {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'PROMPT_DELETE_PLAYLIST':
      return Object.assign({}, state, {
        isVisible: true,
        promptText: 'Supprimer la playlist ?',
        confirmText: 'Supprimer',
        cancelText: 'Annuler',
        callback: action.callback
      })

    case 'PROMPT_DELETE_PLAYLIST_ITEM':
      return Object.assign({}, state, {
        isVisible: true,
        promptText: 'Supprimer ' + action.title + ' de la playlist ?',
        confirmText: 'Supprimer',
        cancelText: 'Annuler',
        callback: action.callback
      })

    case 'PROMPT_UNLINK_ACCOUNT':
      return Object.assign({}, state, {
        isVisible: true,
        promptText: 'Déconnecter le profil ?',
        confirmText: 'Déconnecter',
        cancelText: 'Annuler',
        callback: action.callback
      })

    case 'PROMPT_CLEAR_QUEUE':
      return Object.assign({}, state, {
        isVisible: true,
        promptText: 'Vider la file d\'attente ?',
        confirmText: 'Vider',
        cancelText: 'Annuler',
        callback: action.callback
      })

    case 'PROMPT_ADD_VIDEO':
      return Object.assign({}, state, {
        form: true,
        isVisible: true,
        promptText: 'Ajouter à la file d\'attente',
        confirmText: 'Ajouter',
        cancelText: 'Annuler',
        callback: action.callback
      })

    case 'PROMPT_UNSUBSCRIBE':
      return Object.assign({}, state, {
        isVisible: true,
        promptText: 'Se désinscrire de ' + action.data.title + ' ?',
        confirmText: 'Se désinscrire',
        cancelText: 'Annuler',
        callback: action.callback
      })

    case 'PROMPT_CLOSE':
      return Object.assign({}, state, { isVisible: false })
  }

  return state
}
