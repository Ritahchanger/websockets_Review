import { useEffect, useState } from "react";
import "./home.css";

import { io } from "socket.io-client";

const Home = () => {
  const socket = io("http://localhost:3000");

  const [gameData, setGameData] = useState("");

  const [score, setScore] = useState(0);

  const [players, setPlayers] = useState({});

  const handleJoinGame = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home">
      <div className="nav">
        <a href="#" className="logo">
          LOGO
        </a>
      </div>
      <form className="content">
        <div className="game-inputs">
          <div>
            <input
              type="text"
              className="name"
              placeholder="Enter your name...."
            />
          </div>
          <div>
            <input
              type="text"
              className="score"
              placeholder="Enter score...."
            />
          </div>
        </div>
        <div className="score">
          <button type="submit">ENTER SCORE</button>
        </div>
      </form>

      <div className="outcomes">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Score</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Home;
