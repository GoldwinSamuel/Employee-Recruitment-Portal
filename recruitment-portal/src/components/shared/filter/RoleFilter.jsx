import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

export function RoleFilter({setRoleIdUsedForFilter }) {
  const [roleList, setRoleList] = useState([]);
  const [role, setRole] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/role/")
      .then((s) => {
        // console.log(s.data);
        setRoleList(s.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const dropDownSelect = (role) => {
    setRole(role.empRole);
    setRoleIdUsedForFilter(role.roleId);
  };

  const dropDownAll = () => {
    setRole("all");
    setRoleIdUsedForFilter(null);
  };

  return (
    <div className="d-flex justify-content-around align-items-center my-1">
      <label className="text-primary px-2 mx-2">Role Filter : </label>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {role}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {roleList.map((role) => (
            <Dropdown.Item
              key={role.roleId}
              href="#"
              onClick={() => dropDownSelect(role)}
            >
              {role.empRole}
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
