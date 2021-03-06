import React, { Component, PureComponent } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import Waypoint from 'react-waypoint';
import Fade from './animations/Fade';
import Icon from './Icon';

class GridItem extends PureComponent {
    render() {
        const { showContent, renderChildren = () => {}, ...props } = this.props;

        return (
            <div
                className={['grid__item', showContent ? '' : 'hidden'].join(
                    ' '
                )}
            >
                {showContent && typeof renderChildren === 'function'
                    ? renderChildren(props)
                    : null}
            </div>
        );
    }
}

class Grid extends Component {
    state = {
        isLoading: false
    };

    getContainer = (el) => (this.grid = el);

    loadItems = () => {
        const {
            props: { loadContent },
            state: { isLoading }
        } = this;

        if (isLoading) {
            return;
        }

        this.setState({ isLoading: true }, async () => {
            await loadContent();

            if (this._unmounting) {
                return;
            }

            this.setState({ isLoading: false });
        });
    };

    componentDidMount() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this._unmounting = true;
    }

    render() {
        const {
            props: { items = [], renderItem = () => {} },
            state: { isLoading },
            grid,
            getContainer
        } = this;

        return (
            <div className="grid" ref={getContainer}>
                {grid &&
                    items.map((props, i) => (
                        <VisibilitySensor
                            key={i}
                            resizeCheck={true}
                            partialVisibility={true}
                            scrollCheck={true}
                            scrollThrottle={100}
                            containment={grid}
                        >
                            {({ isVisible }) => (
                                <GridItem
                                    {...props}
                                    showContent={isVisible}
                                    renderChildren={renderItem}
                                />
                            )}
                        </VisibilitySensor>
                    ))}

                {grid ? (
                    <Waypoint
                        scrollableAncestor={grid}
                        onEnter={this.loadItems}
                    />
                ) : null}

                <Fade
                    in={isLoading}
                    className="grid__loading is-active"
                    unmountOnExit={false}
                >
                    <Icon className="rotating" name="loading" />
                </Fade>
            </div>
        );
    }
}

export default Grid;
