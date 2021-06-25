import React from 'react'

export default function ArrowIcon({showList,arrowIcon,handleToShowDataList}) {
    return (
        <div onClick={()=>handleToShowDataList(!showList)} className={"autocomplete-icon autocomplete-arrow-icon"}>
            <img style={{transform : showList ? "rotate(180deg)" : "rotate(0)"}}
                src={arrowIcon} alt="arrow-icon"/>
        </div>
    )
}
