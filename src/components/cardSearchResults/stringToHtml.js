import React, { useEffect } from 'react';
import { useRef } from 'react';
import '../../App.css';

const StringToHtml = ({htmlString}) => {

    const containerRef = useRef(null);
    
    useEffect(() => {

        if (containerRef.current) {
  
            containerRef.current.innerHTML = "";

            const template = document.createElement("template");
            template.innerHTML = `${htmlString}`;
            
            containerRef.current.appendChild(template.content.firstChild);
       }
    }, [htmlString]);
    
  return (
   <>
    <div className="HTML_container" ref={containerRef}>
    </div>
   </>
   
  )
};

export default StringToHtml;