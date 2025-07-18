import Input from "../input"
import Content from "../content"
import "./main.css"
import { useState } from "react";

export default function Main() {
    let text = null;
    const [data, setData] = useState(text)

    function onInputEvent(e) {
        text = e.target.value;
    }

    function onClickEvent() {
        setData(text)
    }

    console.log(data);

    return (
        <>
            <header>
                <div className="header">
                    <Input onInputEvent={onInputEvent} onClickEvent={onClickEvent}></Input>
                </div>
            </header>
            <main>
                <Content data={data}></Content>
            </main>
            <footer>
                <div className="footer"></div>
            </footer>
        </>

    )
}
