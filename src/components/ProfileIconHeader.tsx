import { StyleSheet, TouchableOpacity } from 'react-native';

import ProfileIcon from "../../assets/profile.svg";

export const ProfileIconHeader = ({ navigation }: {navigation: any}) => {
  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={goToProfile} style={styles.container}>
      <ProfileIcon width={24} height={24}/>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16
    }
});
