import { useEffect, useState } from "react";

import "./home.css";

import { io } from "socket.io-client";

const Home = () => {
  const socket = io("http://localhost:3000");

  const [name, setName] = useState("");

  const [score, setScore] = useState("");

  const [players, setPlayers] = useState([]);

  const handleJoinGame = (e) => {
    e.preventDefault();

    if (!name || !Number(score) || typeof Number(score) !== "number") {
        return alert("Enter a valid name & score");
      }

    console.log({ name, score });

    socket.emit("playerJoined", { name, score });

    setName("");

    setScore("");
  };

  useEffect(() => {
    socket.on("updatePlayers", (playersList) => {
      setPlayers(playersList);
    });

    return () => socket.off("updatePlayers");
  }, []);

  return (
    <div className="home">
      <div className="nav">
        <a href="#" className="logo">
          LOGO
        </a>
      </div>
      <form className="content" onSubmit={handleJoinGame}>
        <div className="game-inputs">
          <div>
            <input
              type="text"
              className="name"
              placeholder="Enter your name...."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="score"
              placeholder="Enter score...."
              value={score}
              onChange={(e) => setScore(e.target.value)}
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
              <td>
                <p>Name</p>
              </td>
              <td>
                <p>Score</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
