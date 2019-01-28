import React, { Fragment, PureComponent } from "react";
import { Col } from "reactstrap";
import YouTube from "react-youtube";
import styled from "styled-components";
const LeftArrow = require("./static/left_arrow.svg");
const RightArrow = require("./static/right_arrow.svg");

const YouTubeWrapper = styled(Col)`
    min-height: 300px;

    .iframeVideo {
        background-color: black;
        // position: absolute;
        // top: 0;
        // left: 0;
    }
`;

const ArrowContainer = styled("span")`
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    cursor: pointer;
    ${({ direction }) => direction === "forward" ? "right" : "left"}: -30px;
    opacity: ${({ isVideoPlaying }) => isVideoPlaying ? `0.6` : `1`};
    z-index: 1;
`;

const Arrow = styled("img")`
    height: 3.5em;
`;

const StyledYouTube = styled(YouTube)`
    position: relative;
`;

type Props = {
    videoIds: string[];
};

class YouTubeCarousel extends PureComponent<Props> {
    public state = {
        currentVideoIndex: null,
        isVideoPlaying: false,
        videoIds: this.props.videoIds,
    };

    public componentDidMount () {
        const shuffledVideoIds = this.state.videoIds.sort(() => Math.random() - 0.5);
        this.setState({
            currentVideoIndex: 0,
            videoIds: shuffledVideoIds,
        });
    }

    public onPlayerStateChange = (event) => {
        const isVideoPlaying = event.data === YouTube.PlayerState.PLAYING;
        this.setState({ isVideoPlaying });
    }

    public showPrevVideo = () => {
        const { currentVideoIndex, videoIds } = this.state;
        const previousVideoIndex = currentVideoIndex - 1 < 0 ? videoIds.length - 1 : currentVideoIndex - 1;
        this.setState({ currentVideoIndex: previousVideoIndex });
    }

    public showNextVideo = () => {
        const { currentVideoIndex, videoIds } = this.state;
        const nextVideoIndex = (currentVideoIndex + 1) % videoIds.length;
        this.setState({ currentVideoIndex: nextVideoIndex });
    }

    public render () {
        const { currentVideoIndex, videoIds, isVideoPlaying } = this.state;
        return (
            <Fragment>
                <YouTubeWrapper xs={12}>
                    <ArrowContainer
                        direction="back"
                        isVideoPlaying={isVideoPlaying}
                        onClick={this.showPrevVideo}>
                        <Arrow
                            src={LeftArrow} />
                    </ArrowContainer>
                    <StyledYouTube
                        className="iframeVideo"
                        onStateChange={this.onPlayerStateChange}
                        videoId={videoIds[currentVideoIndex]} />
                    <ArrowContainer
                        direction="forward"
                        isVideoPlaying={isVideoPlaying}
                        onClick={this.showNextVideo}>
                        <Arrow
                            src={RightArrow} />
                    </ArrowContainer>
                </YouTubeWrapper>
            </Fragment>
        );
    }
}

export default YouTubeCarousel;


