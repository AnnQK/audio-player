import { useEffect, useState, useRef } from "react";
import Display from "../Display/Display";
import style from "./Player.module.scss";
import RangeInput from "../RangeInput/RangeInput";

function Player() {
    const [songsList, setSongsList] = useState([]);
    const [audioInfo, setAudioInfo] = useState({});
    const [isPlaying, setIsPlaying] = useState(null);
    const [elapsed, setElapsed] = useState(0)
    const audioRef = useRef(null);
    const intervalRef = useRef(null);

    const changeTiming = (e) => {
        if (!audioRef.current) {
            return
        }
        audioRef.current.currentTime = e.target.value
        const _elapsed = Math.floor(audioRef?.current?.currentTime);
        setElapsed(_elapsed);
    }

    const playAudio = () => {
        if (audioRef.current) {
            setIsPlaying(true);
            audioRef.current.play()
        }
    }

    const pauseAudio = () => {
        if (audioRef.current) {
            setIsPlaying(false);
            audioRef.current.pause()
        }
    }

    const stopAudio = () => {
        if (audioRef.current) {
            setIsPlaying(null);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setElapsed(0)
        }
    }

    const skipAudio = (direction) => {
        if (isPlaying) {
            stopAudio();
        }
        const activeIdx = songsList.findIndex(item => item.id === audioInfo.id);
        let nextIdx = activeIdx + (direction === "next" ? 1 : -1);
        if (nextIdx < 0) nextIdx = songsList.length - 1;
        if (nextIdx === songsList.length) nextIdx = 0;
        setAudioInfo(songsList[nextIdx]);
        if (isPlaying) {
            setTimeout(() => {
                playAudio();
            }, 500);
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
            const res = await fetch("https://songs-db.vercel.app/songs").then(res => res.json())
            setSongsList(res);
            setAudioInfo(res[0])
        }
        getSong()
    }, [])

    return (
        <div className={style.container}>
            <Display title={audioInfo?.title} artist={audioInfo?.artist} isPlaying={isPlaying} />
            <div className={style.btnWrapper}>
                <button onClick={playAudio} className={`${style.btn} ${isPlaying ? style.active : ""}`} type="button">
                    <img src={"assets/icons/play_icon.svg"} className={style.icon} alt="controls play icon" />
                </button>
                <button onClick={pauseAudio} className={`${style.btn} ${!isPlaying && audioRef?.current?.currentTime !== 0 ? style.active : ""}`} type="button">
                    <img src={"assets/icons/pause_icon.svg"} className={style.icon} alt="controls icon" />
                </button>
                <button onClick={stopAudio} className={style.btn} type="button">
                    <img src={"assets/icons/stop_icon.svg"} className={style.icon} alt="controls pause icon" />
                </button>
                <button className={style.btn} onClick={() => skipAudio("prev")} type="button">
                    <img src={"assets/icons/skip_icon.svg"} className={style.icon} alt="controls prev icon" />
                </button>
                <button className={style.btn} onClick={() => skipAudio("next")} type="button">
                    <img src={"assets/icons/skip_icon.svg"} className={style.icon} alt="controls next icon" />
                </button>
            </div>
            <RangeInput ref={audioRef} elapsed={elapsed} changeTiming={changeTiming} song_url={audioInfo?.song_url} />
        </div>
    );
}

export default Player;