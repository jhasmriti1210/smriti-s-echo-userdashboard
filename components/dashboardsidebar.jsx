import { FaUser, FaUserEdit, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="h-screen w-72 bg-white shadow-xl p-6 flex flex-col justify-between">
      {/* Top Logo */}
      <div>
        <div className="flex items-center space-x-2 mb-10">
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            S
          </div>
          <h1 className="text-xl font-bold">SMRITI JHA</h1>
        </div>

        {/* Navigation Buttons */}
        <nav className="space-y-6">
          <button
            onClick={() => router.push("/loginstuff/dashboardpage/userprofile")}
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaUser className="text-xl" />
            <span>Your Profile</span>
          </button>

          <button
            onClick={() =>
              router.push("/loginstuff/dashboardpage/updateprofile")
            }
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaUserEdit className="text-xl" />
            <span>Update Profile</span>
          </button>

          <button
            onClick={() =>
              router.push("/loginstuff/dashboardpage/favouritepoetry")
            }
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaStar className="text-xl text-yellow-500" />
            <span>Favorite Poems</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
