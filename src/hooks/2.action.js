import React, { useState, useCallback, useEffect } from 'react';
import './common.css';

let idle = Object.freeze({ type: 'Idle' });
let pending = Object.freeze({ type: 'Pending' });

export const useAction = (fn) => {
  let [response, setResponse] = useState(idle);

  let action = useCallback(
    (...args) => {
      setResponse(pending);
      return Promise.resolve(fn(...args))
        .then(result => {
          setResponse({ type: 'Success', result })
          return result;
        })
        .catch(error => {
          setResponse({ type: 'Failure', error })
          return error;
        });
    },
    [fn],
  );

  return [response, action];
}

const fetchData = () =>
    fetch('https://jsonplaceholder.typicode.com/todos/').then(res => res.json())


export default () => {
    const [response, performFetch] = useAction(fetchData);

    console.log('[2.action.js]: ', response);

    return (
        <div className={'container'}>

            <button onClick={performFetch}> click me [2.action.js] </button>

            <div>current status: {response.type}</div>

            {response.type === 'Success' && (
                <div>fetched data!</div>
            )}
        </div>
    );
}