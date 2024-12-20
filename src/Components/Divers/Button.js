import "./Button.css"

function Button({buttonProperties}) {
    return (
        <div className="Button">
            <button className="roman-button"
                    disabled={buttonProperties.isDisabled}
                    onClick={()=>{(buttonProperties.params) ? buttonProperties.onClick(buttonProperties.params) : buttonProperties.onClick()}}>
                <img src={buttonProperties.pathToIcon}/> {buttonProperties.name}
            </button>
        </div>
    )
}

export default Button;