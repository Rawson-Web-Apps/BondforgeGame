import "./Guide.css"; // Import the Guide.css file
import { useNavigate } from "react-router-dom";

const Guide = () => {
  const navigate = useNavigate();

  const main_menu = () => {
    navigate("/bondforge");
  };

  const about = () => {
    navigate("/bondforge/about");
  };

  const updates = () => {
    navigate("/bondforge/updates");
  };

  const guide = () => {
    navigate("/bondforge/guide");
  };
  return (
    <div className="guide-page">
      <div className="button-container">
        <button onClick={main_menu}>Main Menu</button>
        <button onClick={about}>About</button>
        <button onClick={updates}>Updates</button>
        <button onClick={guide}>Guide</button>
      </div>
      <h1>Game Guide</h1>
      <p>
        Welcome to the <strong>Bondforge</strong> Game Guide! Whether you're a
        seasoned adventurer or just starting your journey, this guide will help
        you understand the core mechanics and enhance your gameplay experience.
      </p>

      <h2>Stat Breakdown</h2>
      <p>
        Your heroes possess various stats that determine their abilities and
        effectiveness in battle. Understanding these stats is crucial for
        optimizing your team and strategizing your approach to missions.
      </p>

      <table className="stats-table">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Strength</strong>
            </td>
            <td>
              Increases the damage of physical attacks, enhancing your hero's
              melee and ranged damage output.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Dexterity</strong>
            </td>
            <td>
              Influences class skills, improving accuracy, critical hit rates,
              and the effectiveness of agility-based abilities.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Constitution</strong>
            </td>
            <td>
              Determines the maximum health points (HP) of your hero, allowing
              them to withstand more damage in battles.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Intelligence</strong>
            </td>
            <td>
              Determines the damage output of magic-based attacks and spells,
              enhancing your hero's magical prowess.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Wisdom</strong>
            </td>
            <td>
              Determines the maximum magic points (MP) of your hero, enabling
              the use of more powerful spells and abilities.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Charisma</strong>
            </td>
            <td>
              Influences the effectiveness and cost of bond skills, affecting
              team synergy and collaborative strategies.
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Understanding and strategically allocating these stats can significantly
        impact your heroes' performance in missions. As you progress, you'll
        have the opportunity to level up your heroes and customize their
        attributes to suit your preferred playstyle.
      </p>

      <p>
        <em>More guides and tips will be added with future updates!</em>
      </p>
    </div>
  );
};

export default Guide;
