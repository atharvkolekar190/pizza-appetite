import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/userActions";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

function Userslist() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.getUsersReducer);
  const { users, error, loading } = userState;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Filter users based on search input
  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-blue-800 mb-5">User Details</h2>

      {/* Search Bar */}
      
      <div className="text-end gap-10">

      <input
        type="text"
        placeholder="Search users..."
        className="border border-slate-900 rounded-md p-2 mb-4 w-3/12"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> <i class="fas fa-search ms-4 me-4"></i>
      </div>

      {loading && <Loading name="Loading users..." />}
      {error && <Error title="Something Went Wrong" desc={error.toString()} />}

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Admin</th>
              <th className="border border-gray-300 p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`text-center even:bg-gray-100 ${
                    user.isAdmin ? "bg-yellow-300 font-semibold" : ""
                  }`}
                >
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">
                    {user.isAdmin ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 p-4 text-center text-red-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Userslist;
