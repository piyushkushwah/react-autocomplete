import React from 'react';
import './data-list.css';
import { DataListItem } from './data-list-item';
import handleError from '../../errorHandler/errorHandler';

export const DataList = React.forwardRef((props,ref) => {

    const dataListItemRef = React.createRef();

    return (
        <div ref={ref} className="data-list">
            {
                props.suggestions && props.suggestions.length !== 0 ?
                props.suggestions.map((data,index)=> {
                if(!handleError(data,'name')) return null;
                return(
                    <DataListItem ref={dataListItemRef}
                        key={index+data.name} 
                        getSlectedSuggestionName={props.getSlectedSuggestionName} 
                        name={data.name}  index={index} 
                        selected={data.selected} 
                        activeSuggestion={props.activeSuggestion}/>
                )})
                :<p className="data-list-error-message data-list-item">No matching data found.</p>
            }
        </div>
    )
})
