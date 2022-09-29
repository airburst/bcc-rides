import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {isAuthenticated && (
        <div>
          <h2>{user?.nickname}</h2>
          <p>{user?.email}</p>
          <p>TODO: Add actions and a view of rides that have been added</p>
        </div>
      )}
    </>
  );
};

export default UserProfile;