import React, { 
  forwardRef, 
  useImperativeHandle, 
  useState, 
  useRef,
} from 'react';
import './common.css';

const MyInput = forwardRef((props, ref) => {
  const [val, setVal] = useState('');
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    blur: () => {
      document.title = val;
      inputRef.current.blur();
    }
  }));

  return (
    <div className={'container'}>
      <input
        ref={inputRef}
        val={val}
        onChange={e => setVal(e.target.value)}
        {...props}
      />
    </div>
  );
});

export const App = () => {
  const ref = useRef(null);
  const onBlur = () => {
    console.log(ref.current); // Only contains one property
    ref.current.blur();
  };

  return <MyInput ref={ref} onBlur={onBlur} />;
};








