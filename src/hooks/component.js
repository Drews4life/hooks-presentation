import React, { useState, useEffect } from 'react';
import './common.scss';


const GenericComponent = ({
    updateEvents,
    fetchCurrentEvents,
    sendStatistics,
}) => {
    const [shouldDisplayBanner, setShouldDisplayBanner] = useState(false);
    const [displayPanel, setDisplayPanel] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchCurrentEvents().then(initialEvents => setEvents(initialEvents))

        return () => {
            sendStatistics('unmount')
        }
    }, [])

    useEffect(() => {
        updateEvents();
    }, [events]);

    useEffect(() => {
        sendStatistics(displayPanel, shouldDisplayBanner)
    }, [displayPanel, shouldDisplayBanner])


    const addEvent = () => setEvents(events => [...events, `new event num ${events.length + 1}`]);

    const toggleDisplayPanel = () => setDisplayPanel((display) => !display)
    const toggleDisplayBanner = () => setShouldDisplayBanner((banner) => !banner)

    return (
        <div className={'container'}>
            <button className="btn btn-event" onClick={addEvent}>Add events</button>
            <button className="btn btn-banner" onClick={toggleDisplayBanner}>Show banner</button>
            <button className="btn btn-panel" onClick={toggleDisplayPanel}>Show events</button>

            {shouldDisplayBanner &&  <div className="banner">Banner</div> }
            {shouldDisplayBanner && displayPanel && <div className="panel">Now we are displayed</div>}

            {
                events.length > 0 && (
                    <div data-id="events-wrapper">
                        {
                            events.map((name, i) => <div className="event" key={i}>{name}</div>)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default GenericComponent;