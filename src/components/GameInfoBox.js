import React from 'react'

const GameInfo = ({ reference, showInfo, setShowInfo }) => {
    const steps = [
        "Choose Difficulty to start the game.",
        "Based on difficulty , the sequence display speed, timer will change.",
        "When a color Box flicker remember the colour , click the Colourbox when its your turn.",
        "If First user input sequence is correct, again a Colour Box will flicker , so memorise all the previous sequence along with the new ones.",
        "The colour boxes will swap their position , so input sequence carefully !",
        "The game will continue until you click the right sequence of Colour box each time with all previous pattern.",
        "On creating a new High Score , Confetti celebrations are done.ok",
        "If your answer is wrong then the Choose Difficulty button appears again, and you have to again start the game from beginning"

    ]
    return (
        <>
            <button
                className="hidden"
                type="button"
                ref={reference}
                onClick={() => setShowInfo(true)}
            >
                Open Card
            </button>
            {showInfo && (
                <>
                    <div
                        className="font-sans font-semibold justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-[80vw] mx-auto max-w-5xl">
                            {/*content*/}
                            <div className="border-0  rounded-xl shadow-lg relative flex flex-col w-full bg-[lime] text-black] outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between py-3 lg:py-5 px-5 lg:px-7 border-b-2 border-solid border-slate-200 rounded-t">
                                    <div>
                                        SIMON GAME PLAYING CARD
                                    </div>

                                    <div className="material-symbols-outlined text-gray-400 hover:text-red-500 cursor-pointer font-extrabold" onClick={() => setShowInfo(false)}>
                                        close

                                    </div>
                                </div>
                                {/*body*/}
                                <div className="py-2 px-5 lg:py-5 lg:px-7 items-center">
                                    {/* Body Header */}
                                    <div className=' mb-4  font-bold text-lg text-[black] lg:text-xl'>
                                        Steps to play :
                                    </div>
                                    {/* Body Main */}
                                    <div className='px-4'>
                                        <ol className=''>
                                            {steps.map((step, key) =>
                                                <ListItem key={key} text={step} />
                                            )}
                                        </ol>
                                    </div>

                                </div>
                                {/*footer*/}
                               
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    )
}

export default GameInfo;


const ListItem = ({ text }) => {
    return (
        <li className='leading-6 lg:leading-8 relative text-xs md:text-sm'>
            <span className='absolute top-[10px] md:top-[7px] lg:top-3 w-[5px] h-[5px] md:w-2 md:h-2 bg-[#fef2b2] rounded-full'></span>
            <p className='ml-4 md:ml-5'> {text}</p>
        </li>
    )
}
export { ListItem };