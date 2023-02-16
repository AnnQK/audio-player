import { useState } from "react";
import style from "./Player.module.scss";

function Player() {
    const [filled, setFilled] = useState(0);
    const changeHandler = (e) => {
        setFilled(e.target.value)
    }
    return (
        <div className={style.box}>
            <input type="range" className={style.range} value={filled} onChange={e => changeHandler(e)} style={{ backgroundSize: `${filled * 100}%` }} max={1} step={0.01} />
        </div>
    );
}

export default Player;