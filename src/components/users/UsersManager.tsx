import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { User } from '../../types/types'
import { removeUser } from '../../redux/slices/users/userSlice'

export function UsersManager() {
  const users = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  const [usersToDisplay, setUsersToDisplay] = useState<User[]>(users.items)
  const [searchKeyWord, setSearchKeyWord] = useState('')

  //Search for user
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
  }
  useEffect(() => {
    if (searchKeyWord.trim() !== '') {
      const results = users.items.filter((user) =>
        user.firstName.toLowerCase().includes(searchKeyWord.toLowerCase())
      )
      setUsersToDisplay(results)
    } else setUsersToDisplay(users.items)
  }, [searchKeyWord, users.items])

  //Display users table
  return (
    <div className="grid">
      <div className="flex">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block  p-2.5"
          type="text"
          onChange={handleChange}
          placeholder="Search for users..."
        />
      </div>
      {users.isLoading && <h3> Loading categories...</h3>}
      <table>
        <tbody>
          <tr className="text-left">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          {usersToDisplay.map((user) => (
            <tr className="border-t-2" key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className=" text-red-400 text-xs"
                  onClick={() => dispatch(removeUser({ userid: user.id }))}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
