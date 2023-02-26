import AudioAnimation from "../AudioAnimation/AudioAnimation";
import style from "./Display.module.scss";

function Display({ title, artist, isPlaying }) {
    return (
        <div className={style.display}>
            <div className={style.info}>
                <h2 className={style.title}>
                    {title}
                </h2>
                <h3 className={style.artist}>
                    {artist}
                </h3>
            </div>
            <AudioAnimation isPlaying={isPlaying} />
        </div>
    );
}

export default Display;