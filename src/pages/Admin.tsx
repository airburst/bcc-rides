import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <h1>Admin Page</h1>
      {isAuthenticated && (
        <div>
          <h2>{user?.nickname}</h2>
          <p>{user?.email}</p>
        </div>)}
    </>
  );
};

export default UserProfile;