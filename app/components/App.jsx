require('../assets/styles/app.scss')

import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Match from 'preact-router/match'

import Header from './header/HeaderContainer'
import Player from './containers/Player'
import Notifications from './Notifications'
import Prompt from './Prompt'

import GoogleLogin from './auth/GoogleLogin'

class App extends Component {
  handleSignIn = (data) => this.props.dispatch({ type: 'SIGN_IN', data })

  render({ children, auth, notifications }) {
    return (
      <div class='layout'>
        <Match>
          {({ path }) => (<Header path={path} />)}
        </Match>

        <main class='layout__content'>
          {auth.isSignedIn ? children : (
            <div class='log_in'>
              <GoogleLogin className='button' onSuccess={this.handleSignIn}>Log in</GoogleLogin>
            </div>
          )}
        </main>

        <Player />

        <Prompt />

        {notifications.message ? (<Notifications />) : null}
      </div>
    )
  }
}

const mapStateToProps = (({ auth, notifications }) => ({ auth, notifications }))

export default connect(mapStateToProps)(App)
