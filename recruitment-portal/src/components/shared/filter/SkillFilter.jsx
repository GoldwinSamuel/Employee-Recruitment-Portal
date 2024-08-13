import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

export function SkillFilter({ setSkillIdUsedForFilter }) {
  const [skillList, setSkillList] = useState([]);
  const [skill, setSkill] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/skill/")
      .then((s) => setSkillList(s.data))
      .catch((e) => console.log(e));
  }, []);

  const dropDownSelect = (skill) => {
    setSkill(skill.skill);
    setSkillIdUsedForFilter(skill.skillId);
  };

  const dropDownAll = () => {
    setSkill("all");
    setSkillIdUsedForFilter(null);
  };

  return (
    <div className="d-flex justify-content-around align-items-center my-1">
      <label className="text-primary px-2 mx-2">Skill Filter : </label>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {skill}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {skillList.map((skill) => (
            <Dropdown.Item
              key={skill.skillId}
              href="#"
              onClick={() => dropDownSelect(skill)}
            >
              {skill.skill}
            </Dropdown.Item>
          ))}
          <Dropdown.Item key="all" href="#" onClick={() => dropDownAll()}>
            all
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
