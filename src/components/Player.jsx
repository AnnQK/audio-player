import { useEffect, useState, useRef } from "react";
import style from "./Player.module.scss";

function Player() {
    const [duration, setDuration] = useState(0);
    const [audioInfo, setAudioInfo] = useState({});
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsed, setElapsed] = useState(0)
    const audioRef = useRef(null);
    const intervalRef = useRef(null);

    const changeTiming = (e) => {
        if (isPlaying) {
            audioRef.current.currentTime = e.target.value
        }
    }

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
            audioRef.current.pause();
        } else {
            setIsPlaying(true);
            audioRef.current.play();
        }
    }

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                const _elapsed = Math.floor(audioRef?.current?.currentTime);
                setElapsed(_elapsed);
            }, 100);
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isPlaying])

    useEffect(() => {
        async function getSong() {
            const { data } = await fetch("https://saavn.me/songs?link=https://www.jiosaavn.com/song/thunderclouds/RT8zcBh9eUc").then(res => res.json())
            setAudioInfo(data[0])
            console.log(data[0])
        }
        getSong()
    }, [])
    return (
        <div className={style.container}>
            <div className={style.display}>
                <div className={style.info}>
                    <h2 className={style.title}>
                        {audioInfo?.name}
                    </h2>
                    <h4 className={style.artist}>
                        {audioInfo?.primaryArtists}
                    </h4>
                </div>
            </div>
            <div className={style.btnWrapper}>
                <button className={style.btn}>
                    <img src={"assets/icons/play_icon.svg"} className={style.icon} />
                </button>
                <button className={style.btn}>
                    <img src={"assets/icons/pause_icon.svg"} className={style.icon} />
                </button>
                <button className={style.btn}>
                    <img src={"assets/icons/stop_icon.svg"} className={style.icon} />
                </button>
                <button className={style.btn}>
                    <img src={"assets/icons/skip_icon.svg"} className={style.icon} />
                </button>
                <button className={style.btn}>
                    <img src={"assets/icons/skip_icon.svg"} className={style.icon} />
                </button>
            </div>
            <div className={style.player}>
                <audio ref={audioRef} src={audioInfo.downloadUrl && audioInfo.downloadUrl[1].link} onLoadedData={(e) => {
                    setDuration(e.currentTarget.duration.toFixed(2))
                }} />
                <input
                    type="range"
                    className={`${style.range} ${!elapsed ? style.empty : ""}`}
                    value={elapsed}
                    onChange={e => changeTiming(e)}
                    max={100}
                    step={1}
                    style={{ background: `linear-gradient(to right, #0000FF ${elapsed}%, #121212 ${elapsed}%)` }} />
            </div>
        </div>
    );
}

export default Player;