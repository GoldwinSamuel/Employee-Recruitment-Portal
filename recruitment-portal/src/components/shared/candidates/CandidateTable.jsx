import React, { useEffect, useState } from "react";
import { filterAllCandidates, filterFinalCandidates } from "../../../api/filterAPI";
import { fetchCandidates, sendCandidateToAdmin } from "../../../api/hrAPI";
import { SkillFilter } from "../filter/SkillFilter";
import { RoleFilter } from "../filter/RoleFilter";
import { NameFilter } from "../filter/NameFilter";
import { Role } from "../roles/Role";
import { Skill } from "../skills/Skill";
import { fillJobRequestFromWorkbench } from "../../../api/pmAPI";

export const CandidateTable = ({
    candidateList,
    reqId,
    jobRequests,
    setRequests,
    show,
    role,
    onCandidateHide,
    hasSkillAndRoleFilter,
    hasCheckbox,
    hasNameFilter,
}) => {
    const [candidates, setCandidates] = useState(candidateList);
    const [checkboxCandidateIds, setCheckboxCandidateIds] = useState([]);

    const [skillIdUsedForFilter, setSkillIdUsedForFilter] = useState(null);
    const [roleIdUsedForFilter, setRoleIdUsedForFilter] = useState(null);
    const [nameUsedForFilter, setNameUsedForFilter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (hasSkillAndRoleFilter) {
                    const response = await filterFinalCandidates(skillIdUsedForFilter, roleIdUsedForFilter);
                    if (Array.isArray(response.data)) {
                        setCandidates(response.data);
                    } else {
                        console.error('Expected an array from filterFinalCandidates API');
                    }
                }

                if (hasNameFilter) {
                    const response = await filterAllCandidates(nameUsedForFilter);
                    if (Array.isArray(response.data)) {
                        setCandidates(response.data);
                    } else {
                        console.error('Expected an array from filterAllCandidates API');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [nameUsedForFilter, skillIdUsedForFilter, roleIdUsedForFilter, hasSkillAndRoleFilter, hasNameFilter]);

    useEffect(() => {
        if (hasSkillAndRoleFilter && show) {
            const fetchCandidatesData = async () => {
                try {
                    const response = await fetchCandidates();
                    setCandidates(response.data);
                } catch (e) {
                    console.log(e);
                }
            };

            fetchCandidatesData();
        }
    }, [show, hasSkillAndRoleFilter]);

    const updateCheckboxCandidates = (e) => {
        const checked = e.target.checked;
        const checkedValue = e.target.value;

        if (checked) {
            setCheckboxCandidateIds((prev) => [...prev, checkedValue]);
        } else {
            setCheckboxCandidateIds((prev) => prev.filter((id) => id !== checkedValue));
        }
    };

    const updateJobRequestList = (jr) => {
        if (jr.filled < jr.vacancies) {
            setRequests((prevState) =>
                prevState.map((req) =>
                    req.requestId === jr.requestId ? { ...req, filled: jr.filled } : req
                )
            );
        } else {
            setRequests((prevState) =>
                prevState.filter((req) => req.requestId !== jr.requestId)
            );
        }
    };

    const fillFromCandidates = async () => {
        const count = checkboxCandidateIds.length;
        const index = jobRequests.findIndex((req) => req.requestId === reqId);
    
        if (index === -1) {
            alert("Job request not found.");
            return;
        }
    
        if (count > jobRequests[index].vacancies - jobRequests[index].filled) {
            alert("You cannot choose more than you can fill!");
            return;
        }
    
        try {
            await Promise.all(checkboxCandidateIds.map(async (canId) => {
                console.log(`Processing candidate ID: ${canId}`);
                await fillJobRequestFromWorkbench(reqId, count);
                await sendCandidateToAdmin(canId);
            }));
    
            setCheckboxCandidateIds([]);
            onCandidateHide();
        } catch (error) {
            console.error('Error processing candidates:', error);
            alert('Failed to process candidates');
        }
    };
    
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end align-items-center">
                {hasSkillAndRoleFilter && <SkillFilter setSkillIdUsedForFilter={setSkillIdUsedForFilter} />}
                {hasSkillAndRoleFilter && <RoleFilter setRoleIdUsedForFilter={setRoleIdUsedForFilter} />}
                {hasNameFilter && <NameFilter setNameUsedForFilter={setNameUsedForFilter} />}
            </div>
            {candidates.length === 0 ? (
                <p className="text-center">No candidates</p>
            ) : (
                <div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Candidate ID</th>
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
                            {candidates.map((candidate) => (
                                <tr key={candidate.candidateId}>
                                    <td>{candidate.candidateId}</td>
                                    <td>{candidate.name}</td>
                                    <td><Role id={candidate.roleId} /></td>
                                    <td>{candidate.phoneNo}</td>
                                    <td>{candidate.email}</td>
                                    <td><Skill id={candidate.skill1Id} /></td>
                                    <td><Skill id={candidate.skill2Id} /></td>
                                    <td><Skill id={candidate.skill3Id} /></td>
                                    {hasCheckbox && (
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={candidate.candidateId}
                                                onChange={updateCheckboxCandidates}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {hasSkillAndRoleFilter && (
                        <button
                            className="btn btn-primary w-100"
                            onClick={fillFromCandidates}
                        >
                            Fill the selected candidates to Job Request
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
