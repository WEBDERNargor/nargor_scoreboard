import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [show, setShow] = useState(false);
  const [class_show,setClass_show]=useState(false);
  const [playerData, setPlayerData] = useState({});
  const [counter, setCounter] = useState({});
  const [online, setOnline] = useState(0);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const handleEvent = (event) => {
      if (event.data.action === 'open') {
        setShow(true);
        setClass_show(true);
        setPlayerData(event.data.data);
        setImg(event.data.img);
      } else if (event.data.action === 'update') {
        setCounter(event.data.counter);
        setOnline(event.data.online);
      } else if (event.data.action === 'changejob') {
        setPlayerData((prevData) => ({
          ...prevData,
          job: event.data.job,
        }));
      } else if (event.data.action === 'close') {
        setClass_show(false);
        setTimeout(() => {
         
        }, 500);
      }
    };

    window.addEventListener('message', handleEvent);
    return () => window.removeEventListener('message', handleEvent);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center overflow-hidden bg-none">
      <AnimatePresence>
        {show && (
          <div 
            key="modal"
            className={`w-[839px] h-[261px] bg-[#D9D9D9] flex flex-row rounded-[10px] mt-[8%] overflow-hidden ${
              class_show ? 'scale-enter' : 'scale-exit'
            }`}
          >
            <div className="basis-2/4 flex justify-center items-center">
              <div className="bg-[#8F8D8D] w-[60%] h-[60%] rounded-[10px]">
                <img className="w-[100%] h-[100%] rounded-[10px]" src={img} alt="Player" />
              </div>
            </div>
            <div className="basis-3/4 flex justify-center items-center">
              <div className="bg-[#9B9B9B] w-[90%] h-[60%] rounded-[10px] mr-[60px] flex">
                <div className="h-full basis-3/4 mt-[20px]">
                  <h3 className="text-lg ml-[50px]">Name : {playerData.name}</h3>
                  <h3 className="text-lg ml-[50px] mt-[10px]">Job : {playerData.job?.grade_label}</h3>
                  <h3 className="text-lg ml-[50px] mt-[10px]">Id : {playerData.id}</h3>
                </div>
                <div className="h-full basis-2/4 mt-[20px]">
                  <h3 className="text-lg mt-[10px]">Online : {online}</h3>
                  {Object.entries(counter).map(([key, value], index) => (
                    <h3 key={index} className="text-lg mt-[10px]">{key} : {value}</h3>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
