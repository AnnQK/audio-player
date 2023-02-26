import { forwardRef } from "react";
import style from "./RangeInput.module.scss"

const RangeInput = forwardRef((props, ref) => {
    const { changeTiming, song_url, elapsed } = props;
    return (
        <div className={style.player}>
            <audio ref={ref} src={song_url} />
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
})

export default RangeInput;