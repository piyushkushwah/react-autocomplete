import React from 'react'

export default function CloseIcon({handleRemoveUserInput,closeIcon}) {
    return (
        <div onClick={handleRemoveUserInput} className="autocomplete-icon">
            <img src={closeIcon} alt="close-icon"/>
        </div>
    )
}
