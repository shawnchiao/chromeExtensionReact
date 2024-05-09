// @ts-nocheck

import React from 'react';

// const playAudio = (audioUrl) => {
//   const audio = new Audio(audioUrl);
//   audio.play();
// };



const PlaySoundIcon = ({ size, style, url }) => {
  const clickHandler = () => {
    chrome.runtime.sendMessage({type: "PLAY_AUDIO", url: url});
  }

  return (
    <svg
      onClick={clickHandler}
      version="1.1"
      id="Uploaded to svgrepo.com"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 32.00 32.00"
      xmlSpace="preserve"
      fill="#000000"
      style={{ cursor: 'pointer', ...style }} // This makes the cursor change to a pointer when hovered
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="2.56"></g>
      <g id="SVGRepo_iconCarrier">
        <style type="text/css">
          {`.puchipuchi_een { fill: #3f3e3e; }`}
        </style>
        <path
          className="puchipuchi_een"
          d="M16,6v20c0,1.1-0.772,1.537-1.715,0.971l-6.57-3.942C6.772,22.463,5.1,22,4,22H3c-1.1,0-2-0.9-2-2 v-8c0-1.1,0.9-2,2-2h1c1.1,0,2.772-0.463,3.715-1.029l6.57-3.942C15.228,4.463,16,4.9,16,6z M26.606,5.394 c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828C25.855,10.3,27,13.062,27,16s-1.145,5.7-3.222,7.778 c-0.781,0.781-0.781,2.047,0,2.828c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586C29.439,23.773,31,20.007,31,16 S29.439,8.227,26.606,5.394z M22.363,9.636c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828C20.479,13.409,21,14.664,21,16 s-0.52,2.591-1.464,3.535c-0.781,0.781-0.781,2.047,0,2.828c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586 C24.064,20.664,25,18.404,25,16S24.063,11.336,22.363,9.636z">
        </path>
      </g>
    </svg>
  );

}



export default PlaySoundIcon;
