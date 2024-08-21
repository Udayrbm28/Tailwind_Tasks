import React from "react";
import { gql, useQuery } from "@apollo/client";
import DefaultLayout from "../../Layouts/DefaultLayout";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import DoughnutChart from "../Charts/DoughnutChart";




function Ship(props) {
  interface Ship {
    name: string;
    active: string;
    class: string;
    year_built: string | null;
    id: string;
  }

  const GET_SHIPS = gql`
    query Shipes {
      ships {
        name
        active
        class
        year_built
        id
      }
    }
  `;
  const { loading, data } = useQuery(GET_SHIPS);
  let barChartData = {} as any;
  let pieChart = {} as any;
  if (data) {
    (()=>{
        barChartData = data.ships.reduce((tot: any, ele: Ship) => {
            if(ele.year_built !== null ){
                if(tot[ele.year_built]=== undefined)
                    tot[ele.year_built]= 0 ; 
                else
                    tot[ele.year_built]= tot [ele.year_built]+1;
            }
            return tot;
        },{});

        pieChart = data.ships.reduce((tot: any ,ele:Ship)=>{
            if(tot[ele.active]===undefined)
                tot[ele.active]=1;
            else
                tot[ele.active]=tot[ele.active]+1;
            return tot;
        },{})


    })();
  }

  return (
    <DefaultLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main>
          <div className="grid  items-center justify-items-center content-center grid-cols-1 sm:grid-cols-2 ">
            <div className="w-[360px] h-[300px]   sm:w-[500px] h-[300px]">
              <BarChart
                data={{
                  labels: Object.keys(barChartData),
                  datasets: [
                    {
                      label: "Ship Manufacture",
                      data: Object.values(barChartData),
                      backgroundColor: "black",
                      borderColor: ["black"],
                      borderWidth: 1,
                    },
                  ],
                }}
              ></BarChart>
            </div>

            <div className="w-64 h-80">
              <DoughnutChart
                data={{
                  labels: Object.keys(pieChart),
                  datasets: [
                    {
                      label: "Launching",
                      data: Object.values(pieChart),
                      backgroundColor: ["red", "green"],
                      borderColor: ["red", "green"],
                    },
                  ],
                }}
              ></DoughnutChart>
            </div>
          </div>

          <div className=" ">
            <div className="flex flex-col items-center ">
              <div>
                <h1 className="font-bold text-5xl  mb-10">Ships</h1>
              </div>

              <div className=" flex border-3 border-black max-h-80 min-w-full   ">
                <table className="table-auto min-w-full ">
                  <div></div>
                  <tr className="">
                    <th className="text-left bg-zinc-300 p-3 tracking-wider ">
                      Ship Name
                    </th>
                    <th className="text-left bg-zinc-300 p-3 tracking-wider ">
                      Category
                    </th>

                    <th className="text-left bg-zinc-300 p-3 tracking-wider">
                      Year
                    </th>
                    <th className="text-left bg-zinc-300 p-3 tracking-wider">
                      Status
                    </th>
                  </tr>
                  <tbody>
                    {data.ships.map((element: Ship) => {
                      return (
                        <tr className="">
                          <td className="p-4 ">{element.name}</td>

                          <td className="p-4 ">
                            {element.class === null ? 7604341 : element.class}
                          </td>

                          <td className="p-4 ">
                            {element.year_built === null
                              ? "unkown"
                              : element.year_built}
                          </td>
                          <td className="p-4 ">
                            {element.active ? (
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
          </div>
        </main>
      )}
    </DefaultLayout>
  );
}

export default Ship;
