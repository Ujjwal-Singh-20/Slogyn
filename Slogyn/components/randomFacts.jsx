import React, { useState, useEffect } from 'react';

const RandomFacts = ({ facts, intervalDuration = 5000 }) => {
    const [currentFact, setCurrentFact] = useState("");

    useEffect(() => {
    //starting with initial random fact
    setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
    //update after interval
    const interval = setInterval(() => {
        setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
    }, intervalDuration);

    return () => clearInterval(interval);
    }, [facts, intervalDuration]);

    return (
    <div className="random-fact bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 backdrop-blur-sm flex flex-row items-center justify-between p-4 m-2 min-h-[60px] rounded-xl shadow-lg ring-orange-600">
        <span className='text-lg text-gray-800 font-medium break-words flex-1'>
            {currentFact}
        </span>
    </div>
    );
};

export default RandomFacts;