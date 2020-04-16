import React, { useState } from 'react';



/*

Don’t call Hooks inside loops, conditions, or nested functions. 
Instead, always use Hooks at the top level of your React function.

*/

/*

Only call hooks from functional components

*/

const useField = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    const [dirty, setDirty] = useState(false);
    const [touched, setTouched] = useState(false);
  
    function handleChange(e) {
      setValue(e.target.value);
      setTouched(true);
    }
  
    return {
      value, 
      setValue,
      dirty, 
      setDirty,
      touched, 
      setTouched,
      handleChange
    }
  }
  
export default () => {
    const username = useField('some username');
    const email = useField('some@mail.com');
  
    return <input name="username" value={username.value} onChange={username.handleChange}/>;
}





export const useHover = () => {
  const [hovering, setHovering] = useState(false);

  const onMouseOver = () => setHovering(true)
  const onMouseOut = () => setHovering(false)

  return [hovering, {
    onMouseOver,
    onMouseOut
  }];
}

export const Tooltip = () => {
    const [hovering, attrs] = useHover();

    return (
      <div className='container' {...attrs}>
        {hovering && <div>hovering is real</div>} 
      </div>
    )
}