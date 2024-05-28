import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .toSorted((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      {/* <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .toSorted((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table> */}
    </div>
  )
}

export default UserList