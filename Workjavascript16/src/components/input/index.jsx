import "./input.css"
function Input (props) {
    const {onInputEvent, onClickEvent} = props;
        
    return (
        <>
         <input type="text" className="text" onChange={onInputEvent}></input>
         <input type="button" value="Сохранить" className="button" onClick={onClickEvent} />
        </>
        
    )
}

export default Input