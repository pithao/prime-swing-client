import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function Zoetest() {
  
  const [ hook, setHook ] = useState( '' );

  return (
    <>
      <h1>Zoetest</h1>
    </>
  );
}


export default Zoetest;