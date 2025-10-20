import { useState } from "react";

function Counter(){
    let [count, setCount] = useState(0);
    function increaseCount() {
        setCount(count++);
    }
    return (
        <>
        <p>Count : {count}</p>
        <button onClick={increaseCount}>Increase Count</button>
        </>
    )
}
export default Counter;