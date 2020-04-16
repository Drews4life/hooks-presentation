import React, { useCallback, useState, useEffect, useReducer, useMemo } from 'react';
import './common.css';

export default () => {
    const [firstCounter, setFirstCounter ] = useState(0);
    const [secondCounter, setSecondCounter ] = useState(0);
    const [thirdCounter, setThirdCounter ] = useState(0);

    const incrementFirst = useCallback(
        // always 0 + 1, because it keeps old reference
        () => setFirstCounter(firstCounter + 1),
        []
    );

    const incrementSecond = useCallback(
        () => setSecondCounter((oldSecondCounter) => oldSecondCounter + 1),
        [],
    )

    const incrementThird = useCallback(
        () => setThirdCounter(thirdCounter + 1),
        [thirdCounter],
    )

    return (
        <div className="container">
            <div>
                <button onClick={incrementFirst}>
                    increment first: {firstCounter}
                </button>
            </div>
            
            <div>
                <button onClick={incrementSecond}>
                    increment second: {secondCounter}
                </button>
            </div>

            <div>
                <button onClick={incrementThird}>
                    increment third: {thirdCounter}
                </button>
            </div>
        </div>
    )
}














// very neochen
const FavoriteEvents = () => {
    const [events, setEvents] = useState([{ name: 'Football' }]);
  
    const add = event => setEvents([...events, event]);
  
    const remove = idx => {
        setEvents([
        ...events.slice(0, idx),
        ...events.slice(idx + 1)
      ]);
    }

    const filterMovies = eventName =>
        setEvents(events.filter(({ name }) => name !== eventName))
  
    return (
        <div></div>
    );
  }


// seems good 
const EVENT_ACTION_TYPES = {
    ADD_EVENT: 'add_event',
    UPDATE_EVENT: 'update_event',
    DELETE_EVENT: 'delete_event',
}

const eventsReducer = (state, action) => {
    switch (action.type) {
        case EVENT_ACTION_TYPES.ADD_EVENT:
            return [...state, action.payload.event]
        case EVENT_ACTION_TYPES.UPDATE_EVENT: 
            const updatedEvent = action.payload.event
            return state.map(event => event.name === updatedEvent.name ? updatedEvent : event )
        case EVENT_ACTION_TYPES.DELETE_EVENT:
            return state.filter(event => event.name !== action.payload.event.name)
        default:
            return state
    }
}

const useEventsReducer = () => {
    const [events, dispatch] = useReducer(eventsReducer, []);

    const addEvent = (event) => 
        dispatch({ 
            type: EVENT_ACTION_TYPES.ADD_EVENT, 
            payload: { event } 
        })

    const updateEvent = (event) =>
        dispatch({ 
            type: EVENT_ACTION_TYPES.UPDATE_EVENT, 
            payload: { event } 
        })

    const deleteEvent = (event) =>
        dispatch({ 
            type: EVENT_ACTION_TYPES.DELETE_EVENT, 
            payload: { event } 
        })

    return [events, {
        addEvent,
        updateEvent,
        deleteEvent,
    }]
}


const EventsComponent = () => {
    const [events, { addEvent, updateEvent, deleteEvent }] = useEventsReducer();

    return (
        <div>
            <button onClick={deleteEvent}>
                Delete
            </button>
        </div>
    )
}