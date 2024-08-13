import axios from "axios";
import { useEffect, useState } from "react"

export const Role = ({id}) => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
          try {
            const response = await axios.get(
              `http://localhost:9090/api/role/${id}`
            );
            // console.log(response);
            setRole(response.data.empRole);
          } catch (err) {
            console.log(err);
          } 
        };
    
        fetchRoles();
    }, []);

    return(
        <div>
            {role}
        </div>
    )
}