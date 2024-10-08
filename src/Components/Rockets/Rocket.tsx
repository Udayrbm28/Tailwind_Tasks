import { gql, useQuery } from "@apollo/client";
import DefaultLayout from "../../Layouts/DefaultLayout";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";

interface rocket {
  name: string;
  type: string;
  active: boolean;
  mass: {
    kg: number;
  };
  height: {
    meters: number;
  };
  country: string;
  engines: {
    type: string;
  };
}

function Rocket() {
  const GET_ROCKETS = gql`
    query Rockets {
      rockets {
        type
        mass {
          kg
        }
        height {
          meters
        }
        country
        engines {
          type
        }
        name
        active
      }
    }
  `;
  const { loading, data } = useQuery(GET_ROCKETS);

  let hisDataMass = {} as any;
  let hisDataHeight = {} as any;
  let pieData = {} as any;
  console.log("jj", data);
  if (data) {
    (() => {
      hisDataMass = data.rockets.reduce((tot: any, ele: rocket) => {
        tot[ele.name] = (ele.mass.kg);
        return tot;
      }, {});

      hisDataHeight = data.rockets.reduce((tot: any, ele: rocket) => {
        tot[ele.name] = (ele.height.meters)*10000;
        return tot;
      }, {});

      pieData = data.rockets.reduce((tot: any, ele: rocket) => {
        const key = ele.active === false ? "IN-ACTIVE" : "ACTIVE";
        if (tot[key] === undefined) {
          tot[key] = 1;
        } else {
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
          <div className="grid  items-center justify-items-center content-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
            <div className="w-[360px] h-[300px]   sm:w-[500px] h-[300px] lg:col-span-2 lg:w-[600px]">
              <BarChart
                data={{
                  labels: Object.keys(Object.keys(hisDataMass)),
                  datasets: [
                    {
                      label: "Rocket hieght(m) ",
                      data: Object.values(hisDataMass),
                      backgroundColor: "black",
                      borderColor: ["black"],
                      borderWidth: 2,
                    },
                    {
                      label: "Rocket Mass(gram)",
                      data: Object.values(hisDataHeight),
                      backgroundColor: "blue",
                      borderColor: ["blue"],
                      borderWidth: 2,
                    },
                  ],
                }}
              ></BarChart>
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
              <h1 className="font-bold text-5xl  mb-10">Rocket </h1>
            </div>

            <div className=" flex border-3 border-black min-w-full max-h-80   ">
              <table className="table-auto min-w-full ">
                <thead className="sticky">
                  <tr className="">
                    <th className="text-left bg-zinc-300 p-1 sm:p-3 ">
                      Rocket Name
                    </th>
                    <th className="text-left bg-zinc-300 p-1 sm:p-3">
                      Country
                    </th>
                    <th className="text-left bg-zinc-300 p-1 sm:p-3">Engine</th>
                    <th className="text-left bg-zinc-300 p-1 sm:p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data.rockets.map((element: rocket) => {
                    return (
                      <tr className="">
                        <td className="p-4">{element.name}</td>

                        <td className="p-4 italic text-gray-500">
                          {element.country}
                        </td>
                        <td className="p-4  ">{element.engines.type}</td>
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
        </main>
      )}
    </DefaultLayout>
  );
}

export default Rocket;
