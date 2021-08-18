import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";

const UserTable = () => {
  const users = useSelector((state) => state.users.allUsers);

  return (
    <Container>
      <Table className="mt-3" striped bordered hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((user1, user2) => user2.blogs.length - user1.blogs.length)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link
                    className=" text-secondary text-decoration-none"
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserTable;
