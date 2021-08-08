import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const User = () => {
  const routeMatch = useRouteMatch("/users/:id");

  const user = useSelector((state) => {
    if (!routeMatch) return null;

    return state.users.allUsers.find(
      (user) => user.id === routeMatch.params.id
    );
  });

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3 style={{padding: "0.5rem"}}>added blogs</h3>
      <ul style={{ padding: "1rem" }}>
        {user.blogs.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
