import { useEffect, useState, useRef } from "react";
import style from "./Player.module.scss";

function Player() {
    const [filled, setFilled] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioInfo, setAudioInfo] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsed, setElapsed] = useState(0)
    const audioRef = useRef(null);
    const intervalRef = useRef(null);

    const changeTiming = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = e.target.value
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
            setAudioInfo(data[0].downloadUrl[0].link)
        }
        getSong()
    }, [])
    return (
        <div className={style.box}>
            <audio ref={audioRef} src={audioInfo} onLoadedData={(e) => {
                setDuration(e.currentTarget.duration.toFixed(2))
            }} />
            <button onClick={() => { audioRef.current.play() }}>play</button>
            <input
                type="range"
                className={`${style.range} ${!elapsed ? style.empty : ""}`}
                value={elapsed}
                onChange={e => changeTiming(e)}
                max={100}
                step={1}
                style={{ background: `linear-gradient(to right, #0000FF ${elapsed}%, #121212 ${elapsed}%)` }} />
        </div>
    );
}

export default Player;