import React from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from './hooks/1.typical';
import Second from './hooks/2.action';
import MemoCallback from './hooks/3.memo-callback';
import Bad from './hooks/5.verybad'
import { App } from './hooks/6.othergoodstuff';
import { EventsParent } from './hooks/7.context';

const Root = () => (
    <div style={styles}>
        <Tooltip />
        <Second />
        <MemoCallback />
        <Bad />
        <App/>
        <EventsParent/>
    </div>
)

const styles = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}
ReactDOM.render(<Root />, document.getElementById('root'));
