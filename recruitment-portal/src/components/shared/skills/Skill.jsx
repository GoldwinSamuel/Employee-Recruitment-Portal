import axios from "axios";
import { useEffect, useState } from "react";

export const Skill = ({ id }) => {
  const [skill, setSkill] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        if (id != null) {
          const response = await axios.get(
            `http://localhost:9090/api/skill/${id}`
          );

          // console.log(response.data.skill);
          setSkill(response.data.skill);
        }else{
            setSkill("-");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSkill();
  }, []);

  return <div>{skill}</div>;
};
