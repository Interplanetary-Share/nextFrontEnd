import Container from '@/app/components/general/containers/container';
import ProfileDetails from '@/app/components/profile/ProfileDetails';
import Logout from '@/app/components/signIn/Logout';

const Profile = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-left text-gray-800 mt-8">
        Profile
      </h1>
      <ProfileDetails />
      <Logout />
    </Container>
  );
};

export default Profile;
