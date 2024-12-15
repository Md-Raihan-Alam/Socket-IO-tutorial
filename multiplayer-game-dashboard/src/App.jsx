import { useEffect, useState } from 'react';
import './App.css'
import { io } from 'socket.io-client'
import Input from './component/input';
function App() {
  const [score,setScores]=useState(null);
  const [scores,setPlayerScores]=useState([]);
  const socket=io("http://localhost:3000");
  function connectSocket(){
    socket.on("connect",(socket)=>{
      console.log("Connected to server",socket);
     
    })
  }
  function handleInput(event){
    let {name,value}=event.target;
    let currentObj={[name]:value};
    setScores({...score,...currentObj});
  }
  function sendScore(){
    console.log(score);
    socket.emit("scores",score);
    socket.on("playerScores",(data)=>{
      setPlayerScores(data);
    });
    
  }
  useEffect(()=>{
    connectSocket();
  },[]);

  return (
    <>
     
      <h1>React Multiplayer Dashboard</h1>
      <Input name="name" placeholder="Enter your name" handleInput={handleInput}/>
      <Input name="score" placeholder="Enter your score" handleInput={handleInput}/>
      <button onClick={sendScore}>Publish Score</button>
      {scores.map((player,index)=>{
        return(
          <div key={index}>
            <h2>{player.name}</h2>
            <h2>{player.score}</h2>
          </div>
        );
      })}
    </>

  )
}

export default App
