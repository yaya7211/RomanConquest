import "./SelectList.css"

function SelectList({selectProperties}) {

    const handleChange = (e) => {
        selectProperties.setState(e.target.value)
        if (selectProperties.toDo) {
            selectProperties.onChange(selectProperties.param)
        }
    }

    return (
        <div className="SelectList">
            <label for={selectProperties.name}>{selectProperties.name}</label>
            <select id={selectProperties.name} onChange={(e) => {handleChange(e)} }>
                {["Select option", ...selectProperties.options].map(option => (
                    option ? <option value={option}>{option}</option> : <div></div>
                ))}
            </select>
        </div>
    )
}

export default SelectList;