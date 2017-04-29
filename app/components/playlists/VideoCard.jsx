import parseDuration from '../../lib/parseDuration'

const { connect } = ReactRedux

const VideoCard = ({ player, video, dispatch }) => {
  const { videoId, title, publishedAt, duration, channelTitle } = video

  function pushToQueue(index = player.queue.length) {
    video.index = player.queue.length
    dispatch({
      type: 'QUEUE_PUSH',
      data: video
    })
  }

  function playVideo() {
    const index = player.queue.length

    video.index = player.queue.length

    pushToQueue(index)
    dispatch({ type: 'CLEAR_WATCHERS' })
    dispatch({
      type: 'PLAY',
      data: video,
      skip: true
    })
  }

  return (
    <div className='card shadow--2dp'>
      <div
        className='card__content'
        onClick={playVideo}
      >
        <div className='card__text'>
          <h2 className='card__text-title'>{title}</h2>
          <p className='card__text-subtitle channel'>{channelTitle}</p>
          <p className='card__text-subtitle date'>{moment(publishedAt).format('MMMM Do YYYY')}</p>
        </div>
        <div>{parseDuration(duration)}</div>
      </div>

      <div className='card__buttons'>
        <button
          className='card__button icon-button'
          onClick={pushToQueue}
        >
          <span className='icon'>
            <svg><use xlinkHref='#icon-playlist-add'></use></svg>
          </span>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ player }) => ({ player })

export default connect(mapStateToProps)(VideoCard)
