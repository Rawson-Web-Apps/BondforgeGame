import "./Updates.css"; // Import the Updates.css file
import { useNavigate } from "react-router-dom";

const Updates = () => {
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
    <div className="updates-page">
      <div className="button-container">
        <button onClick={main_menu}>Main Menu</button>
        <button onClick={about}>About</button>
        <button onClick={updates}>Updates</button>
        <button onClick={guide}>Guide</button>
      </div>
      <h1>Future Updates</h1>
      <p>
        We're continuously working to improve <strong>Bondforge</strong> and
        bring you an even more immersive and strategic gaming experience. Here's
        what's on the horizon:
      </p>

      <div className="update-section">
        <h2>Level Up System</h2>
        <p>
          Defeat enemies to earn experience points (XP) and level up your
          heroes. As your heroes grow stronger, allocate points into key
          attributes such as Strength, Dexterity, Constitution, Intelligence,
          Wisdom, and Charisma to customize their abilities and playstyles.
        </p>
      </div>

      <div className="update-section">
        <h2>Class Trees</h2>
        <p>
          Unlock new classes by meeting specific conditions and achievements.
          Each new class offers unique stats and skills, allowing for deeper
          strategic options and diverse team compositions.
        </p>
      </div>

      <div className="update-section">
        <h2>Class Changing</h2>
        <p>
          Experience the flexibility of class changing! You can now select and
          switch your characters' classes, enabling dynamic role adjustments to
          adapt to different missions and challenges.
        </p>
      </div>

      <div className="update-section">
        <h2>New Weapons and Armor</h2>
        <p>
          Expand your arsenal with a variety of new weapons and armor sets. Each
          item not only enhances your heroes' stats but also provides unique
          abilities and perks to give you an edge in battles.
        </p>
      </div>

      <div className="update-section">
        <h2>New Areas</h2>
        <p>
          Explore new regions to recover, engage in fierce battles against new
          enemies, and uncover hidden secrets. Each area offers unique
          challenges and rewards to keep your adventures fresh and exciting.
        </p>
      </div>

      <div className="update-section">
        <h2>Enhanced Battle Menu and Improved UI</h2>
        <p>
          We've revamped the battle menu to provide a more intuitive and
          user-friendly interface. Enjoy streamlined navigation, clearer action
          options, and a visually appealing design that enhances your strategic
          planning during combat.
        </p>
      </div>

      <p>
        Stay tuned for more updates as we continue to develop and refine{" "}
        <strong>Bondforge</strong>. Your feedback and support are invaluable in
        shaping the future of the game!
      </p>
    </div>
  );
};

export default Updates;
