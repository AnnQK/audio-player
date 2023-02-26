import style from "./AudioAnimation.module.scss";

function AudioAnimation({ isPlaying }) {
    return (
        <div className={`${style.middle} ${!isPlaying ? style.pause : ""}`}>
            <div className={`${style.bar} ${style.bar1}`}></div>
            <div className={`${style.bar} ${style.bar2}`}></div>
            <div className={`${style.bar} ${style.bar3}`}></div>
            <div className={`${style.bar} ${style.bar4}`}></div>
            <div className={`${style.bar} ${style.bar5}`}></div>
            <div className={`${style.bar} ${style.bar6}`}></div>
            <div className={`${style.bar} ${style.bar7}`}></div>
            <div className={`${style.bar} ${style.bar8}`}></div>
        </div>
    );
}

export default AudioAnimation;