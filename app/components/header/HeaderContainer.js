// jshint esversion: 6, asi: true
// eslint-env es6

import cookie from 'react-cookie'
import { logIn, googleLogin } from '../../actions/auth'
import { getVideo } from '../../actions/database'
import SearchHeader from './SearchHeader'
import QueueHeader from './QueueHeader'
import SearchForm from '../search/SearchForm'

const { connect } = ReactRedux

const Header = ({ auth, playlistItems, player, search, dispatch }) => {
  return (
    <header className='mdl-layout__header'>
      {player.showQueue ? (
        <QueueHeader />
      ) : search.isOpen ? (
        <SearchHeader />
      ) : (
        <div className='mdl-layout__header-row'>
          {playlistItems.isOpen ? (
            <button
              className='mdl-layout__drawer-button icon-button'
              onClick={() => dispatch({ type: 'PLAYLIST_CLOSE' })}
            >
              <span className='icon'>
                <svg><use xlinkHref='#icon-back'></use></svg>
              </span>
            </button>
          ) : null}

          <span className='mdl-layout-title'>{playlistItems.isOpen ? playlistItems.title : 'Youtube Lite'}</span>

          <div className='mdl-layout-spacer'></div>
          <nav className='mdl-navigation'>
            <button
              className='mdl-navigation__link icon-button'
              onClick={() => {
                dispatch({ type: 'SCREEN_CLOSE' })

                dispatch({ type: 'QUEUE_CLOSE' })

                dispatch({ type: 'SEARCH_OPEN' })
              }}
            >
              <span className='icon'>
                <svg><use xlinkHref='#icon-search'></use></svg>
              </span>

            </button>

            <button className='mdl-navigation__link icon-button' onClick={auth.token ? () => dispatch({ type: 'UNLINK' }) : () => dispatch(logIn()) }>
              {auth.token ? (
                <span className='icon'>
                  <svg><use xlinkHref='#icon-exit'></use></svg>
                </span>
              ) : (
                <span className='icon'>
                  <svg><use xlinkHref='#icon-user'></use></svg>
                </span>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
const mapStateToProps = ({ auth, playlistItems, player, search }) => ({ auth, playlistItems, player, search })

export default connect(mapStateToProps)(Header)
