import React, {
    useMemo, 
    useCallback,
    useState, 
    useEffect
} from 'react'
import './common.css';

export default () => {
    // We create two states that will keep count of the number of time all hooks are called
    const [callbackCount, setCallbackCount] = useState(0);
    const [memoCount, setMemoCount] = useState(0);
  
    const memoFunction = () => {
    // Do something that will take a lot of processing ...
      let i = 0
      const startPerformance = performance.now();
      console.log('[3.memo.js] memo func started: ');

      while(i < 10000) {
        i++;
        console.log('[3.memo.js] bzzzz... standby')
      }

      console.log('[3.memo.js] memo func finished: ', performance.now() - startPerformance);

      return i
    };
  
    const callbackFunction = useCallback(() => {
      console.log(callbackCount, "[3.memo.js] callback called");
      return callbackCount;
    }, [callbackCount]);
  
    // We create the memo hook, when memoCount changes, the function will be executed again
    const result = useMemo(memoFunction, [memoCount]);
  
    return (
      <React.Fragment>
        <ChildComponent action={callbackFunction} />
  
        {/* trigger a change in the child */}
        <button onClick={() => setCallbackCount(callbackCount + 1)}>
          Change callback count
        </button>
  
        {/* After creating useMemo, each change of memoCount will trigger the function passed to the hook,
      otherwise the memoized value will be returned */}
        <button onClick={() => setMemoCount(memoCount + 1)}>
          Change memo count
        </button>

        <div>{result}</div>
      </React.Fragment>
    );
  };
  
  const ChildComponent = ({action}) => {
    const [value, setValue] = useState(0)
  
    useEffect(() => {
      let val = action()
      setValue(val)
    }, [action]) 


    // useLayoutEffect (() => {
    //   let val = action()
    //   setValue(val)
    // }, [action]) 

    return(
      <React.Fragment>
        Child : {value}
      </React.Fragment>
    )
  }


//the same as PureComponent
const MemoziedComponent = React.memo(<div/>, (prevProps, nextProps) => {
    //do not do anything if stringified props are equal
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
})
