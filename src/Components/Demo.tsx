import { useQuery,gql } from "@apollo/client";
import DefaultLayout from "../Layouts/DefaultLayout";
import Navbar from "./Navbar";

function Demo() {
    const GET_LAUNCHES = gql`
        query Launches {
            launches{
                launch_date_utc
                mission_name
                upcoming
                launch_year
            }
        }
    `

    const {loading,error,data} = useQuery(GET_LAUNCHES);
    console.log("Hey" ,data);
    
    return <DefaultLayout>
     
    </DefaultLayout>
}

export default Demo;
