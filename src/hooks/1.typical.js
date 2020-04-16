import React, { useState } from 'react';


const useField = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    const [focus, setFocus] = useState(false);
    const [touched, setTouched] = useState(false);
  
    function handleChange(e) {
      setValue(e.target.value);
      setTouched(true);
      setFocus(true);
    }
  
    return {
      value, 
      setValue,
      focus,
      setFocus,
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



class Wrapper extends React.Component {

  state = { hovering: false };

  onMouseOut = () => this.setState({hovering: true});
  onMouseOut = () => this.setState({hovering: false});

  render() {
    <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      {this.props.children(this.state.hovering)}
    </div>
  }
}


const CompwithHover = () => (
  <Wrapper>
    {(hovering) => (
      <div>...</div>
    )}
  </Wrapper>
)






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