import React from "react";
// import useLagRadar from "./useLagRadar";
import Bar from "../Components/Bar";
import {
  Heading,
} from "@chakra-ui/react";
function AdminOverview() {
//   useLagRadar();

  return (
    <div className="manage-order-container">
          <Heading p={"18px 20px "}>Admin Data Overview</Heading>
      <div>
        <Bar />
      </div>
    
    </div>
  );
}
export default AdminOverview;
