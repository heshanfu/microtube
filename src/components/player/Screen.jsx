import React, { PureComponent } from 'react';

import YoutubePlayer from '../YoutubePlayer';

const playerOptions = {
    playerVars: {
        autohide: 1,
        modestbranding: 1,
        iv_load_policy: 3,
        controls: 0,
        showinfo: 0
    }
};

class Screen extends PureComponent {
    render() {
        const { videoId, onReady, onEnd, onStateChange } = this.props;

        return videoId ? (
            <YoutubePlayer
                className="screen__content"
                videoId={videoId}
                opts={playerOptions}
                onReady={onReady}
                onEnd={onEnd}
                onStateChange={onStateChange}
            />
        ) : null;
    }
}

export default Screen;
