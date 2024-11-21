import { FaX } from "react-icons/fa6";
import "./Home.css";
import { FaTwitch, FaXTwitter, FaPatreon } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="about-page">
      <div className="button-container"></div>

      <h1>TARawson</h1>
      <h2>About Me</h2>
      <p>
        Hello! I'm <strong>TARawson</strong>, an indie developer working on an{" "}
        <strong>Unreal Engine 5</strong> game called{" "}
        <strong>Bondforge Arena</strong>. The game is still very early in
        development, but it has been incredibly fun to work on.
      </p>
      <p>
        I'm also creating the browser game, <strong>Bondforge</strong>, as a
        spin-off of Bondforge Arena. I want to experiment with turn-based
        concepts until I have a great grasp on game theory. My background as a
        full-stack developer makes this platform an easy choice for
        experimentation.
      </p>
      <p>
        I hold a bachelor's degree in computer science with an emphasis in data
        science. I love working with AI but am committed to ensuring that
        creators are properly credited for their work.
      </p>
      <p>
        I play a large variety of games, with a particular love for{" "}
        <strong>JRPGs</strong>. Some of my favorite game series include{" "}
        <em>Final Fantasy</em>, <em>Kingdom Hearts</em>, <em>Persona</em>,{" "}
        <em>The Legend of Zelda</em>, and <em>Fire Emblem</em>. While I adore
        classics and turn-based games, I'm passionate about exploring various
        genres.
      </p>

      <h3>My Socials</h3>
      <ul className="developer-links">
        <li>
          <a
            href="https://www.twitch.tv/tarawson"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitch />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/TARawson"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a>
        </li>
      </ul>

      <h3>Bondforge Arena Socials</h3>
      <ul className="developer-links">
        <li>
          <a
            href="https://x.com/bondforgearena"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a>
        </li>
        <li>
          <a
            href="https://www.patreon.com/c/bondforgearena"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPatreon />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
