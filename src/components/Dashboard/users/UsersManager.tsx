import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../redux/store'
import {
  blockUserThunk,
  deleteUserThunk,
  switchUserRoleThunk
} from '../../../redux/slices/users/userSlice'
import { ROLES } from '../../../constants/constants'

export function UsersManager() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users)
  const [searchKeyWord, setSearchKeyWord] = useState('')

  //Search for user
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
  }

  //Display users table
  return (
    <div className="flex flex-col min-h-screen align-middle">
      <div className="flex flex-col justify-center md:flex-row border-b-2 border-zinc_secondery pb-5">
        <div className="pt-2 relative text-primary_pink">
          <input
            onChange={handleChange}
            className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search for user..."
          />
          <svg
            className="h-4 w-4 fill-current absolute right-0 top-0 mt-5 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </div>
      </div>
      {users.isLoading && <h3> Loading users...</h3>}
      {users.error && <h3> {users.error}</h3>}
      <div className="max-h-[600px] overflow-y-auto ml-16">
        <table className="md:mx-40 md:my-8 w-9/12">
          <tbody>
            <tr className="text-left text-primary_pink">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
            {users.users.map((user) => (
              <tr className="border-t-2 border-zinc_secondery" key={user._id}>
                <td className="text-primary_green py-5">{user.firstName}</td>
                <td className="text-primary_green">{user.lastName}</td>
                <td className="text-primary_green">{user.email}</td>
                <td>
                  <label
                    className="flex flex-col cursor-pointer text-xs"
                    htmlFor={`role${user._id}`}>
                    <div className="flex flex-col">
                      <div className="relative">
                        <input
                          className="sr-only"
                          type="checkbox"
                          role="switch"
                          id={`role${user._id}`}
                          checked={user.role === ROLES.ADMIN}
                          onChange={() => dispatch(switchUserRoleThunk(user._id))}
                        />
                         <div className="relative bg-primary_grey w-16 h-5 rounded-full transition-transform duration-200 ease-in-out transform translate-x-[0.25rem]">
                          <span
                            className={`absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                              user.role === ROLES.ADMIN
                                ? 'pl-2 text-left text-primary_pink'
                                : 'pr-2 text-right text-primary_green'
                            }`}>
                            {user.role === ROLES.ADMIN ? 'Admin' : 'User'}
                          </span>
                          <div
                            className={`absolute w-5 h-5 top-0 left-0 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                              user.role === ROLES.ADMIN
                                ? 'translate-x-12 bg-primary_pink'
                                : 'translate-x-0 bg-primary_green'
                            }`}></div>
                        </div>
                      </div>
                    </div>
                  </label>
                </td>
                <td>
                  <label
                    className="flex flex-col items-center cursor-pointer text-center text-xs"
                    htmlFor={`flexSwitchCheck${user._id}`}>
                    <div className="flex flex-col">
                      <div className="relative">
                        <input
                          className="sr-only"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheck${user._id}`}
                          checked={user.isBlocked}
                          onChange={() => dispatch(blockUserThunk(user._id))}
                        />
                        <div className="relative bg-primary_grey w-16 h-5 rounded-full transition-transform duration-200 ease-in-out transform translate-x-[0.25rem]">
                          <span
                            className={`absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                              user.isBlocked
                                ? 'pl-2 text-left text-primary_pink'
                                : 'pr-2 text-right text-primary_green'
                            }`}>
                            {user.isBlocked ? 'unBlock' : 'Block'}
                          </span>
                          <div
                            className={`absolute w-5 h-5 top-0 left-0 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                              user.isBlocked
                                ? 'translate-x-12 bg-primary_pink'
                                : 'translate-x-0 bg-primary_green'
                            }`}></div>
                        </div>
                      </div>
                    </div>
                  </label>
                </td>
                <td className="text-right">
                  <button
                    className="text-primary_pink"
                    onClick={() => dispatch(deleteUserThunk(user._id))}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{' '}
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
