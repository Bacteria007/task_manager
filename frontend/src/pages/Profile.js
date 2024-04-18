import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { PrimaryBtn } from "../components/PrimaryBtn";

const Profile = () => {
  const { serverUrl } = useAppContext();
  const navigate=useNavigate()
  const role = localStorage.getItem("role")
  const name = localStorage.getItem("name")
  const email = localStorage.getItem("email")
  const signout = () => {
    localStorage.setItem("name", '')
    localStorage.setItem("email", '')
    localStorage.setItem("token", '')
    localStorage.setItem("role", '')
    navigate("/login")
}
  return (
    <div className="flex min-h-full flex-col w-full px-6 py-12 lg:px-8">
      <div className="w-full">
        <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Profile
        </h2>
      </div>

      <div className=" w-full">
        <div className="flex flex-row mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Name :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {name}
          </p>
        </div>
        <div className="flex flex-row  mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Email :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {email}
          </p>
        </div>
        <div className="flex flex-row  mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Role :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {role}
          </p>
        </div>
       <PrimaryBtn handleClick={signout} title={"Log out"} showplus={false}/>
        
      </div>
    </div>
  );
};

export default Profile;
