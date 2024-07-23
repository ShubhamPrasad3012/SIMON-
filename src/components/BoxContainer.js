import React from 'react';
import red from "../sounds/red.mp3";
import green from "../sounds/green.mp3";
import blue from "../sounds/blue.mp3";
import yellow from "../sounds/yellow.mp3";
import Box from './Box';

const BoxContainer = ({ randomChosenColour, userClick, buttonPositions }) => {
  const soundMap = {
    red: new Audio(red),
    green: new Audio(green),
    blue: new Audio(blue),
    yellow: new Audio(yellow),
  };

  return (
    <>
      <div className="block w-fit mx-auto pt-20">
        <div className="grid grid-cols-2 flex-wrap justify-center">
          {buttonPositions.map((color, index) => (
            <Box
              key={index}
              color={color}
              next={randomChosenColour}
              userClick={userClick}
              sound={soundMap[color]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BoxContainer;
