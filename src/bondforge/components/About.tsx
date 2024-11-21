import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {
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
    <div className="about-page">
      <div className="button-container">
        <button onClick={main_menu}>Main Menu</button>
        <button onClick={about}>About</button>
        <button onClick={updates}>Updates</button>
        <button onClick={guide}>Guide</button>
      </div>
      <h1>About Bondforge</h1>
      <p>
        Welcome to <strong>Bondforge</strong>, an exciting turn-based RPG that
        takes inspiration from our upcoming title,{" "}
        <strong>Bondforge Arena</strong>. While <strong>Bondforge Arena</strong>{" "}
        is a 3-player online cooperative game developed using Unreal Engine 5,{" "}
        <strong>Bondforge</strong> offers a unique spin-off experience designed
        to explore and expand upon the rich concepts introduced in{" "}
        <strong>Bondforge Arena</strong> through a strategic, turn-based
        gameplay style.
      </p>

      <h2>What is Bondforge Arena?</h2>
      <p>
        <strong>Bondforge Arena</strong> is a thrilling 3-player online
        cooperative game set in a dark fantasy world. Players embark on
        challenging missions, coordinating their attacks and defenses to
        overcome formidable foes. The game launches with three playable heroes,
        with additional heroes available as paid DLC, and features free mission
        updates to keep the adventure fresh and engaging.
      </p>
      <p>
        At the heart of <strong>Bondforge Arena</strong> are deep RPG elements
        inspired by Dungeons & Dragons. Each hero has unique stats that
        determine their strength and abilities. As players complete missions,
        they earn experience, level up their heroes, allocate stat points, and
        unlock new skills at key milestones. The game also features dynamic
        difficulty scaling, allowing players of varying levels to team up and
        tackle missions across four difficulty tiers, ensuring a balanced and
        enjoyable experience for everyone.
      </p>

      <h2>Gameplay Systems Transferred to Bondforge</h2>
      <p>
        <strong>Bondforge</strong> retains several core gameplay systems from
        <strong>Bondforge Arena</strong>, enhancing them for a turn-based RPG
        experience:
      </p>

      <ul className="gameplay-systems">
        <li>
          <strong>Unique Class Abilities</strong>
          <ul>
            <li>
              Each class in <strong>Bondforge</strong> has a unique ability
              tailored to their role, providing strategic options and enhancing
              gameplay diversity.
            </li>
            <li>
              For example, the <strong>Warrior</strong> might have a "Shield
              Bash" ability that stuns enemies, while the <strong>Rogue</strong>{" "}
              could utilize "Shadow Strike" for high burst damage.
            </li>
            <li>
              These abilities encourage players to thoughtfully plan their
              actions and collaborate effectively with their teammates.
            </li>
          </ul>
        </li>
        <li>
          <strong>Bond System</strong>
          <ul>
            <li>
              Initiate a bond link with a teammate to activate powerful bond
              abilities, fostering strategic coordination during missions.
            </li>
            <li>
              Generate Bond Points (BP) through basic attacks, which can be
              spent to activate bond skills, allowing for dynamic and flexible
              strategies.
            </li>
            <li>
              Each bond link can hold up to four selected bond skills, tailored
              to each hero's strengths and playstyle.
            </li>
          </ul>
        </li>
        <li>
          <strong>Player Skills</strong>
          <ul>
            <li>
              Equip each hero with a unique set of skills before each mission,
              promoting player choice and strategic planning.
            </li>
          </ul>
        </li>
      </ul>

      <h2>The Bondforge Advantage</h2>
      <p>
        By reimagining the intense cooperative gameplay of{" "}
        <strong>Bondforge Arena </strong>
        into a turn-based format, <strong>Bondforge</strong> offers a more
        deliberate and strategic approach to combat and teamwork. Dive into a
        world where every decision counts, alliances are crucial, and the bond
        between heroes can turn the tide of battle.
      </p>
      <p>
        Whether you're a seasoned veteran of <strong>Bondforge Arena</strong> or
        new to the franchise, <strong>Bondforge</strong> provides a fresh and
        engaging experience that builds upon the foundations of cooperative
        strategy and deep RPG mechanics. Join us on this new adventure and forge
        your own legend in the world of Bondforge.
      </p>
    </div>
  );
};

export default About;
