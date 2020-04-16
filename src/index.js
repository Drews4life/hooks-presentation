import React from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from './hooks/1.typical';
import Second from './hooks/2.action';
import MemoCallback from './hooks/3.memo-callback';
import Bad from './hooks/5.verybad'

const Root = () => (
    <div style={styles}>
        <Tooltip />
        <Second />
        <MemoCallback />
        <Bad />
    </div>
)

const styles = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}
ReactDOM.render(<Root />, document.getElementById('root'));
