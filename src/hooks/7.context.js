import React, { 
    forwardRef, 
    useImperativeHandle, 
    useReducer, 
    useContext, 
    useState, 
    useRef,
    useEffect,
  } from 'react';
import './common.css';


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
            return state.slice(0, -1)
        default:
            return state
    }
}

const EventsContext = React.createContext([]);

const EventsProvider = ({ children }) => {
    const [events, dispatch] = useReducer(eventsReducer, []);

    useEffect(() => {
        addEvent("first");
    }, [])

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

    const deleteEvent = () =>
        dispatch({ 
            type: EVENT_ACTION_TYPES.DELETE_EVENT,
        })

    return (
        <EventsContext.Provider value={{ 
            events, 
            dispatch,
            addEvent,
            updateEvent,
            deleteEvent,
        }}>
            {children}
        </EventsContext.Provider>
    )
}

const EventsAdder = () => {
    const { addEvent } = useContext(EventsContext);

    return (
        <div>
            <button onClick={() => addEvent('drews')}>
                Add
            </button>
        </div>
    )
}

const EventsDeleter = () => {
    const { deleteEvent } = useContext(EventsContext);

    return (
        <div>
            <button onClick={deleteEvent}>
                delete
            </button>
        </div>
    )
}

const EventsLogger = () => {
    const { events } = useContext(EventsContext);

    console.log('[7.context.js] events: ', events)

    return <div/>
}

export const EventsParent = () => (
    <div className={'container'}>
        <EventsProvider>
            <EventsLogger/>
            <EventsAdder/>
            <EventsDeleter/>
        </EventsProvider>
    </div>
)
