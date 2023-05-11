import NavBar from "@/components/NavBar";
import Display from "@/components/Display";

const DashBoard = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <NavBar />
      <Display/>
    </div>
  );
};

export default DashBoard;
