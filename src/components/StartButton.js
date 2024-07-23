import React from 'react'

const StartButton = ({ nextSequence, isStarted, setIsStarted }) => {

    return (
        <div className="absolute bottom-20 sm:bottom-14 md:bottom-8 lg:bottom-4 left-1/2 -translate-x-[50%]">
            {!isStarted && <button
                className={` `}
                onClick={() => {
                    setIsStarted(true)
                    setTimeout(() => {
                        nextSequence()
                    }, 100)
                }}
            >
                
            </button>}
        </div>
    )   
}
export default StartButton;