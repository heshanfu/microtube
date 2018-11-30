import * as api from '../api/youtube';

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

const notify = ({ message }) => async (dispatch, getState) => {
    dispatch({ type: 'notifications/OPEN', data: message });

    await delay(4000);

    if (getState().notifications.message) {
        dispatch({ type: 'notifications/CLOSE' });

        await delay(300);

        dispatch({ type: 'notifications/CLEAR_MESSAGE' });
    }
};

export function getPlaylists(config) {
    return async (dispatch) => {
        try {
            const data = await api.getPlaylists(config);

            dispatch({ type: 'playlists/UPDATE_ITEMS', data });
        } catch (err) {
            console.error(err);
            dispatch(notify({ message: 'Error fetching playlists.' }));
        }
    };
}

// export function getPlaylistTitle (accessToken, playlistId) {
//   return async (dispatch) => {
//     try {
//       const title = await api.getPlaylistTitle(accessToken, [playlistId])
//
//       dispatch({ type: 'SET_PLAYLIST_TITLE', data: { title } })
//     } catch (err) {
//       dispatch({ type: 'notifications/OPEN', data: 'Error fetching playlist title.' })
//     }
//   }
// }

export function removePlaylist({ title, playlistId }) {
    return (dispatch) => {
        dispatch({
            type: 'prompt/OPEN',
            data: {
                promptText: `Remove ${title} ?`,
                confirmText: 'Remove',
                callback: async () => {
                    try {
                        await api.removePlaylist(playlistId);

                        dispatch({
                            type: 'playlists/REMOVE_ITEM',
                            data: { playlistId }
                        });

                        dispatch({ type: 'prompt/CLOSE' });
                    } catch (error) {
                        dispatch(
                            notify({ message: 'Error deleting playlist.' })
                        );
                    }
                }
            }
        });
    };
}

export function getPlaylistItems(config) {
    return async (dispatch) => {
        try {
            const { playlistId } = config;

            const [playlistTitle, data] = await Promise.all([
                api.getPlaylistTitle(playlistId),
                api.getPlaylistItems(config)
            ]);

            dispatch({
                type: 'playlist/OPEN',
                data: { playlistTitle }
            });

            dispatch({
                type: 'playlist/UPDATE_ITEMS',
                data
            });
        } catch (err) {
            console.error(err);
            dispatch(notify({ message: 'Error fetching playlist items.' }));
        }
    };
}

export function removePlaylistItem({ title, playlistItemId }) {
    return (dispatch) => {
        dispatch({
            type: 'prompt/OPEN',
            data: {
                promptText: `Remove ${title} ?`,
                confirmText: 'Remove',
                callback: async () => {
                    try {
                        await api.removePlaylistItem(playlistItemId);

                        dispatch({
                            type: 'playlist/REMOVE_ITEM',
                            data: { playlistItemId }
                        });

                        dispatch(
                            notify({
                                message: `Remove "${title}" from playlist.`
                            })
                        );

                        dispatch({ type: 'prompt/CLOSE' });
                    } catch (error) {
                        dispatch(
                            notify({ message: 'Error deleting playlist item.' })
                        );
                    }
                }
            }
        });
    };
}

export function queuePlaylist({ playlistId, play }) {
    return (dispatch, getState) => {
        const {
            player: { queue }
        } = getState();

        const newIndex = queue.length;

        const getItems = async (pageToken) => {
            try {
                const { items, nextPageToken } = await api.getPlaylistItems({
                    playlistId,
                    pageToken
                });

                dispatch({ type: 'QUEUE_PUSH', data: items });

                if (play && !pageToken && items.length) {
                    dispatch({
                        type: 'QUEUE_SET_ACTIVE_ITEM',
                        data: { index: newIndex }
                    });
                }

                if (nextPageToken) {
                    getItems(nextPageToken);
                }
            } catch (err) {
                dispatch(notify({ message: 'Error fetching playlist items.' }));
            }
        };

        getItems();
    };
}

export function searchVideos(config) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'search/SET_QUERY',
                data: { query: config.query }
            });

            const data = await api.searchVideos(config);

            dispatch({ type: 'search/UPDATE_ITEMS', data });
        } catch (err) {
            dispatch(notify({ message: 'Error searching videos.' }));
        }
    };
}

export function queueVideos(ids = []) {
    return async (dispatch) => {
        try {
            const data = await api.getVideosFromIds(ids);

            dispatch({ type: 'QUEUE_PUSH', data });
        } catch (err) {
            dispatch(notify({ message: 'Error fetching video.' }));
        }
    };
}

export function getSubscriptions(config) {
    return async (dispatch) => {
        try {
            const data = await api.getSubscriptions(config);

            dispatch({ type: 'subscriptions/UPDATE_ITEMS', data });
        } catch (err) {
            dispatch(notify({ message: 'Error fetching subscriptions.' }));
        }
    };
}

export function getChannelTitle(channelId) {
    return async (dispatch) => {
        try {
            const title = await api.getChannelTitle(channelId);

            dispatch({ type: 'SET_CHANNEL_TITLE', data: { title } });
        } catch (err) {
            dispatch(notify({ message: 'Error fetching channel title.' }));
        }
    };
}

export function getChannelVideos(config) {
    return async (dispatch) => {
        try {
            const data = await api.getChannelVideos(config);

            dispatch({ type: 'channel/UPDATE_ITEMS', data });
        } catch (err) {
            dispatch(notify({ message: 'Error fetching channel videos.' }));
        }
    };
}
