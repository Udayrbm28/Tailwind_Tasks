import { gql, useQuery } from "@apollo/client";
import Navbar from "../Navbar";
import DefaultLayout from "../../Layouts/DefaultLayout";
import LineGraph from "../Charts/LineGraph";
import PieChart from "../Charts/PieChart";

// import { useEffect } from 'react';

interface HomepageProps {
  props: string;
}

interface launches {
  mission_name: string;
  launch_date_utc: string;
  launch_year: number;
  upcoming: boolean | string;
}

const Homepage: React.FC<HomepageProps> = () => {
  const GET_LAUNCHES = gql`
    query Launches {
      launches {
        launch_date_utc
        mission_name
        upcoming
        launch_year
      }
    }
  `;
  const { loading, data } = useQuery(GET_LAUNCHES);

  let hisData = {} as any;
  let pieData = {} as any;

  if (data) {
    (() => {
      hisData = data.launches.reduce((tot: any, ele: launches) => {
        if (isNaN(tot[ele.launch_year]) && !tot[ele.launch_year])
          tot[ele.launch_year] = 1;
        else tot[ele.launch_year] = parseInt(tot[ele.launch_year]) + 1;
        return tot;
      }, {});

      pieData = data.launches.reduce((tot: any, ele: launches) => {
      const key = ele.upcoming === false ? "IN-ACTIVE" : "ACTIVE";
        if (tot[key] === undefined) {
          
          tot[key] = 1;
        } else{
       
          tot[key] = parseInt(tot[key]) + 1;
        }
        return tot;
      }, {});

     

    })();
  }

  return (
    <DefaultLayout>
      {loading ? (
        <>Loading...</>
      ) : (
        <main>
          <div className="grid  items-center justify-items-center content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            <div className="w-[360px] h-[300px]   sm:w-[500px] h-[300px]">
              <LineGraph
                labels={Object.keys(hisData)}
                datasets={[
                  {
                    label: "Launching",
                    data: Object.values(hisData),
                    borderColor: "black",
                  },
                ]}
              ></LineGraph>
            </div>
            <div className="w-1/2 h-80">
              <PieChart
                data={{
                  labels: Object.keys(pieData),
                  datasets: [
                    {
                      label: "Launching",
                      data: Object.values(pieData),
                      backgroundColor: ["red", "green"],
                    },
                  ],
                }}
              ></PieChart>
            </div>
          </div>

          <div className="flex flex-col items-center ">
            <div>
              <h1 className="font-bold text-5xl  mb-10">Rocket Missions</h1>
            </div>

            <div className=" flex border-3 border-black min-w-full max-h-80   ">
              <table className="table-auto min-w-full ">
                <thead className="sticky">
                  <tr className="">
                    <th className="text-left bg-zinc-300 sm:p-3 ">
                      Mission Name
                    </th>
                    <th className="text-left bg-zinc-300 sm:p-3">Launched</th>
                    <th className="text-left bg-zinc-300 sm:p-3">Year</th>
                    <th className="text-left bg-zinc-300 sm:p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data.launches.map((element: launches) => {
                    return (
                      <tr className="">
                        <td className="p-4">{element.mission_name}</td>

                        <td className="p-4 italic text-gray-500">
                          Since{" "}
                          {Math.round(
                            (new Date().getTime() -
                              new Date(
                                data.launches[1].launch_date_utc
                              ).getTime()) /
                              (1000 * 3600 * 24)
                          )}{" "}
                          days...
                        </td>
                        <td className="p-4  ">{element.launch_year}</td>
                        <td className="p-4 ">
                          {element.upcoming ? (
                            <div className="text-green-700 font-extrabold">
                              ACTIVE
                            </div>
                          ) : (
                            <div className="flex  items-center text-red-700 font-extrabold ">
                              IN-ACTIVE
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}
    </DefaultLayout>
  );
};

export default Homepage;
