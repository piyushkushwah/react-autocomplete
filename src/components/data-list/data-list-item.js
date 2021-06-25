import React from 'react'

export const DataListItem = React.forwardRef((props,ref)=> {
    return (
        <p ref={ref} style={{backgroundColor: props.activeSuggestion === props.index ? 'seashell' : '' }} 
        className="data-list-item" 
        onClick={()=> props.getSlectedSuggestionName(props.name,props.index)}>{props.name}</p>)
})
