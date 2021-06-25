import React,{useState,useEffect,useRef} from 'react';
import './autocomplete.css';
import {DataList} from '../data-list/data-list';
import closeIcon from '../../assets/closeIcon.svg';
import arrowIcon from '../../assets/arrow.png';
import CloseIcon from './closeIcon';
import ArrowIcon from './arrowIcon';
import handleError from '../../errorHandler/errorHandler';


export default function Autocomplete({suggestions,getVlaueFromAutocomplete}) {

    const [userInput, setuserInputstate] = useState('');
    const [filteredSuggestion, setFilteredSuggestionState] = useState(suggestions);
    const [showList,setShowList] = useState(false);
    const [activeSuggestion,setActiveSuggestion] = useState(0);
    const autocompleteRef = useRef();
    const dataListRef = React.createRef();
    const inputRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [autocompleteRef])

    useEffect(() => {
        if(userInput.length === 0){
          setActiveSuggestion(0);
        }
       getVlaueFromAutocomplete(userInput);
    }, [userInput])

    const handleFilterSuggestions = (event) => {

        const value = event.target.value;
        setuserInputstate(value);
        setShowList(true);

        const filteredSuggestionData = value.length !== 0 ? suggestions.filter(data=> {
            if(!handleError(data,'name')) return;
            return data.name.toLowerCase().startsWith(value.toLowerCase())
        }) : suggestions;
        
        setFilteredSuggestionState(filteredSuggestionData);
    }

    const handleOnFocus = ()=>{
        setShowList(true);
    }

    const  handleClickOutside = (event) => {
        if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
            setShowList(false);
        }
    }

    const getSlectedSuggestionName = (name,index) => {
        setuserInputstate(name);
        setShowList(false);
        setActiveSuggestion(index);
    }

    const handleOnKeyDown = (event) => {
        switch (event.keyCode) {
           case 13:
                setuserInputstate(filteredSuggestion[activeSuggestion].name);
                setShowList(false);
               break;
            case 38: 
                if(activeSuggestion !== 0) setActiveSuggestion(activeSuggestion-1) ;
                if(dataListRef) dataListRef.current.scrollTop -= 50;
                break;
            case 40:
                if(activeSuggestion !== filteredSuggestion.length - 1) setActiveSuggestion(activeSuggestion+1);
                if(dataListRef && activeSuggestion !== 0) dataListRef.current.scrollTop += 50 ;
            break;
       }
    }

    const handleRemoveUserInput = () => {
        setuserInputstate('');
        setActiveSuggestion(0);
        setFilteredSuggestionState(suggestions);
        setShowList(true);
        dataListRef.current.scrollTo(0,0);
        inputRef.current.focus();
    }

    const handleToShowDataList = (value) => {
        setShowList(value);
    }

    return (
        <div ref={autocompleteRef} className="autocomplete-wrapper">
            <div className="autocomplete-input-wrapper">

                <input 
                    ref={inputRef} onClick={handleOnFocus} 
                    onKeyDown={handleOnKeyDown} value={userInput}
                    className="autocomplete-input" type="text" name="searchInput"
                    id="searchInput" onChange={handleFilterSuggestions} 
                    onFocus={handleOnFocus} />
                    {
                        userInput.length !== 0 ? 
                            <CloseIcon 
                                    handleRemoveUserInput={handleRemoveUserInput} 
                                    closeIcon={closeIcon} /> 
                        :null
                    }
                    {
                        showList ? 
                            <ArrowIcon handleToShowDataList={handleToShowDataList} 
                            arrowIcon={arrowIcon} showList={showList} />  
                            : <ArrowIcon handleToShowDataList={handleToShowDataList} 
                            arrowIcon={arrowIcon} showList={showList} />
                    }

            </div>
            <div style={{
                    opacity: showList? 1 : 0,
                    visibility: showList ? 'visible' : 'hidden'
                    ,zIndex: showList ? 999 : -1
                }} 
                className="autocomplete-data-list">
                <DataList ref={dataListRef} activeSuggestion={activeSuggestion}
                getSlectedSuggestionName={getSlectedSuggestionName} 
                suggestions={filteredSuggestion}/>
            </div>
        </div>
    )
}
