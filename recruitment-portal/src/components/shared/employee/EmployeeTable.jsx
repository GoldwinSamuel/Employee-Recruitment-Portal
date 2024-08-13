import React, { useEffect, useState } from "react";
import { Role } from "../roles/Role";
import { Skill } from "../skills/Skill";
import { fetchWorkBenchEmployees, fillJobRequestFromWorkbench, makeEmployeeActive, makeEmployeeInactive } from "../../../api/pmAPI";
import { SkillFilter } from "../filter/SkillFilter";
import { RoleFilter } from "../filter/RoleFilter";
import { StatusFilter } from "../filter/StatusFilter";
import { NameFilter } from "../filter/NameFilter";
import { filterAllEmployees, filterInactiveEmployees } from "../../../api/filterAPI";

export const EmployeeTable = ({
  employeeList,
  reqId,
  jobRequests,
  setRequests,
  show,
  onWorkbenchHide,
  hasFillFromWorkbenchSubmit,
  hasMakeEmployeeActive,
  hasCheckbox,
  hasStatusAndNameFilter,
}) => {
  const [checkboxEmployeeIds, setCheckboxEmployeeIds] = useState([]);
  const [employees, setEmployees] = useState(employeeList);
  const [skillIdUsedForFilter, setSkillIdUsedForFilter] = useState(null);
  const [roleIdUsedForFilter, setRoleIdUsedForFilter] = useState(null);

  const [statusUsedForFilter, setStatusUsedForFilter] = useState(null);
  const [nameUsedForFilter, setNameUsedForFilter] = useState(null);

  // Changes the employee table as per the chosen skill and role
  useEffect(() => {
    if (hasFillFromWorkbenchSubmit) {
      filterInactiveEmployees(skillIdUsedForFilter, roleIdUsedForFilter)
        .then((s) => setEmployees(s.data))
        .catch((e) => console.log(e));
    }

    if (hasStatusAndNameFilter) {
      filterAllEmployees(nameUsedForFilter, statusUsedForFilter)
        .then((s) => setEmployees(s.data))
        .catch((e) => console.log(e));
    }

    if (!hasCheckbox) {
    }
  }, [statusUsedForFilter, nameUsedForFilter,skillIdUsedForFilter, roleIdUsedForFilter]);

  // PM
  if (hasFillFromWorkbenchSubmit) {
    useEffect(() => {
      fetchWorkBenchEmployees().then((s) => setEmployees(s.data));
    }, [show]);
  }

  const updateCheckboxEmployees = (e) => {
    const checked = e.target.checked;
    const checkedValue = e.target.value;

    if (checked) {
      setCheckboxEmployeeIds([...checkboxEmployeeIds, checkedValue]);
    } else {
      setCheckboxEmployeeIds(
        checkboxEmployeeIds.filter(function (e) {
          return e !== checkedValue;
        })
      );
    }
    console.log(checkboxEmployeeIds);
  };

  function updateJobRequestList(jr) {
    if (jr.filled < jr.vacancies) {
      console.log("Filled is less than vacancy!");
      setRequests((prevState) => {
        return prevState.map((req) => {
          return req.requestId === jr.requestId
            ? { ...req, filled: jr.filled }
            : req;
        });
      });
    } else {
      setRequests((prevState) => {
        return prevState.filter((req) => {
          return req.requestId != jr.requestId;
        });
      });
    }
  }

  // PM
  const fillFromWorkbench = () => {
    const count = checkboxEmployeeIds.length;

    const index = jobRequests.findIndex((req) => req.requestId == reqId);

    if (count > jobRequests[index].vacancies - jobRequests[index].filled) {
      alert("You cannot chose more than you can fill!");
    } else {
      checkboxEmployeeIds.forEach(async (empId) => {
        await fillJobRequestFromWorkbench(reqId, count).then((s) =>
          updateJobRequestList(s.data)
        );
        await makeEmployeeActive(empId).then(() =>
          setCheckboxEmployeeIds(
            checkboxEmployeeIds.filter((id) => id != empId)
          )
        );
      });
      onWorkbenchHide();
    }
  };

  // TL
  const makeCheckBoxEmployeesActive = () => {
    const count = checkboxEmployeeIds.length;
    checkboxEmployeeIds.forEach(async (empId) => {
      await makeEmployeeInactive(empId).then(() =>
        setCheckboxEmployeeIds(checkboxEmployeeIds.filter((id) => id != empId))
      );
    });
    alert(`${count} employees made active!`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end align-items-center">
        {hasFillFromWorkbenchSubmit && (<SkillFilter setSkillIdUsedForFilter={setSkillIdUsedForFilter} />)}
        {hasFillFromWorkbenchSubmit && (<RoleFilter setRoleIdUsedForFilter={setRoleIdUsedForFilter} />)}
        {hasStatusAndNameFilter && (<StatusFilter setStatusUsedForFilter={setStatusUsedForFilter}/>)}
        {hasStatusAndNameFilter && (<NameFilter setNameUsedForFilter={setNameUsedForFilter}/>)}
      </div>
      {employees.length === 0 ? (
        <p className="text-center">No inactive employees</p>
      ) : (
        <div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Skill 1</th>
                <th>Skill 2</th>
                <th>Skill 3</th>
                {hasCheckbox && <th>Select</th>}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>
                  <td>{employee.name}</td>
                  <td>
                    <Role id={employee.roleId} />
                  </td>
                  <td>{employee.phoneNo}</td>
                  <td>{employee.email}</td>
                  <td>
                    <Skill id={employee.skill1Id} />
                  </td>
                  <td>
                    <Skill id={employee.skill2Id} />
                  </td>
                  <td>
                    <Skill id={employee.skill3Id} />
                  </td>
                  {hasCheckbox && (
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="select"
                        id={employee.empId}
                        value={employee.empId}
                        onChange={updateCheckboxEmployees}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {hasFillFromWorkbenchSubmit && (
            <button
              className="btn btn-primary w-100"
              onClick={fillFromWorkbench}
            >
              Fill the selected employees to workbench
            </button>
          )}
          {hasMakeEmployeeActive && (
            <button
              className="btn btn-primary w-100"
              onClick={makeCheckBoxEmployeesActive}
            >
              Make the selected employees active
            </button>
          )}
        </div>
      )}
    </div>
  );
};
