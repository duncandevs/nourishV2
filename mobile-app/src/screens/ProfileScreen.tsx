import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Colors } from "../theme";
import { Input, Button } from "react-native-elements";
import { useAppState } from "../state";
import CircluarDownArrow from "../../assets/circular-down-arrow.svg";
import CircluarUpArrow from "../../assets/circular-up-arrow.svg"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { validateEmail, validatePasswordWithConfirmation} from "../utility";
import UserService from "../domains/users/services";
import { DeleteAccountModal, Toast } from "../components";
import { supabase } from "../clients/supabase";


export const ProfileScreen = ({ navigation }) => {
    const { user: {data: user, handleLogOut, updateUserState } } = useAppState();
    const [ name, setName ] = useState('');
    const [ nameError, setNameError ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ password, setPassword ] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
    const [ passwordConfirmationError, setPasswordConfirmationError] = useState('');
    const [ saveError, setSaveError ] = useState('');
    const [ isPasswordGroupShown, setIsPasswordGroupShown ] = useState(false);
    const [ isProfileInfoGroupShown, setIsProfileInfoGroupShown ] = useState(false);
    const [ isAccountInfoGroupShown, setIsAccountInfoGroupShown ] = useState(false);
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const [ isSuccessToastShow, setIsSuccessToastShown ] = useState(false);
    
    useEffect(()=>{
        setName(user?.name);
        setEmail(user?.email)
    }, [user]);

    const handleNameValidation = (name: string): boolean => {
        if(!name || name.length < 3) {
            setNameError('Name must be at least 3 characters long');
            return false; 
        };
        setNameError('');
        return true
    };

    const handleEmailValidation = (email: string): boolean => {
        const { isValid, error } = validateEmail(email);
        setEmailError(error)
        return isValid
    };

    const handlePasswordValidation = (password: string, passwordConfirmation: string): boolean => {
        const { isValid, error } = validatePasswordWithConfirmation(password, passwordConfirmation);
        setPasswordError(error)
        return isValid
    };

    const handleSave = async () => {
        const validations = [
            handleNameValidation(name),
            handleEmailValidation(email),
        ];

        // only handle this validation if password or confirmation is entered
        if(password || passwordConfirmation){
            validations.push(
                handlePasswordValidation(password, passwordConfirmation)
            )
        };

        if(!validations.includes(false)) {
            const {error} = await UserService.updateUserProfile({ userId: user?.id, name, email, password });
            if(error) {
                setSaveError(error)
            } else {
                setSaveError('');
                await updateUserState({ name, email });
                setIsSuccessToastShown(true)
            }
        }
    };

    const logOut = () => {
        UserService.logOutUser().then(async ()=>{
            await handleLogOut();
            await UserService.deleteUserFromStorage();
            await supabase.auth.signOut();
            navigation.navigate('AuthScreen');
        })
    };

    const handleDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const onCancelDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const onConfirmDeleteAccount = () => {
        setIsDeleteModalOpen(false);
        UserService.deleteAccount({ userId: user?.id });
    };

    return (

        <ScrollView style={styles.container}>
            <Toast visible={isSuccessToastShow} message="updated successfully!" onDismiss={()=>setIsSuccessToastShown(false)} />
            <View style={styles.forms}>
                <View>
                    <View style={[styles.row, styles.infoGroup]}>
                        <Text variant="paragraph2" style={styles.title}>Profile Info</Text>
                        <TouchableOpacity onPress={()=>setIsProfileInfoGroupShown(!isProfileInfoGroupShown)}>
                            {isProfileInfoGroupShown && <CircluarUpArrow width={28} height={28} fill={Colors.gray04}/>}
                            {!isProfileInfoGroupShown && <CircluarDownArrow width={28} height={28} fill={Colors.gray04}/>}
                        </TouchableOpacity>
                    </View>
                    {isProfileInfoGroupShown && <>
                        <Input 
                            label="name" 
                            value={name}
                            errorMessage={nameError}
                            inputContainerStyle={styles.input} 
                            onChangeText={(text)=> setName(text)} />
                        <Input 
                            label="email"
                            value={email}
                            errorMessage={emailError} 
                            inputContainerStyle={styles.input} 
                            onChangeText={(text)=> setEmail(text)} />
                    </>}
                </View>
                <View>
                    <View style={[styles.row, styles.infoGroup]}>
                        <Text variant="paragraph2" style={styles.title}>Change Password</Text>
                        <TouchableOpacity onPress={()=>setIsPasswordGroupShown(!isPasswordGroupShown)}>
                            {isPasswordGroupShown && <CircluarUpArrow width={28} height={28} fill={Colors.gray04}/>}
                            {!isPasswordGroupShown && <CircluarDownArrow width={28} height={28} fill={Colors.gray04}/>}
                        </TouchableOpacity>
                    </View>
                    {isPasswordGroupShown && 
                    <>
                        <Input 
                            label="new password"  
                            value={password}
                            errorMessage={passwordError}
                            inputContainerStyle={styles.input}
                            placeholder="********"
                            onChangeText={(text)=> setPassword(text)} />
                        <Input 
                            label="confirm password" 
                            value={passwordConfirmation}
                            errorMessage={passwordConfirmationError}
                            inputContainerStyle={styles.input}
                            placeholder="********"
                            onChangeText={(text)=> setPasswordConfirmation(text)} />
                    </>}
                </View>
                <View>
                    <View style={[styles.row, styles.infoGroup]}>
                        <Text variant="paragraph2" style={styles.title}>Account</Text>
                        <TouchableOpacity onPress={()=>setIsAccountInfoGroupShown(!isAccountInfoGroupShown)}>
                            {isAccountInfoGroupShown && <CircluarUpArrow width={28} height={28} fill={Colors.gray04}/>}
                            {!isAccountInfoGroupShown && <CircluarDownArrow width={28} height={28} fill={Colors.gray04}/>}
                        </TouchableOpacity>
                    </View>
                    {isAccountInfoGroupShown && 
                    <>
                        <Button title='delete account' buttonStyle={styles.deleteButton} onPress={handleDeleteModal}/>
                    </>}
                    <DeleteAccountModal 
                        isOpen={isDeleteModalOpen} 
                        onCancel={onCancelDeleteModal} 
                        onConfirm={onConfirmDeleteAccount}
                    />
                </View>
                <Button title="save changes" buttonStyle={styles.saveButton} onPress={handleSave}/>
                <Button title="log out" buttonStyle={styles.logOutButton} onPress={logOut} titleStyle={styles.logOutButtonTitle}/>
                <Text color="warn" textAlign="center">{saveError}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray00,
        height: '100%'
    },
    forms: {
        padding: 16,
        gap: 32,
        paddingTop: 32,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: Colors.gray03,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 4,
        paddingLeft: 16,
        borderColor: Colors.gray02,
        borderWidth: 1
    },
    infoGroup: {
        marginBottom: 24
    },
    saveButton: {
        backgroundColor: 'black',
        height: 56,
        borderRadius: 20
    },
    logOutButton: {
        backgroundColor: 'white',
        height: 56,
        borderRadius: 20,
        borderColor: Colors.gray03,
        borderWidth: 1
    },
    logOutButtonTitle: {
        color: 'black'
    },
    deleteButton: {
        backgroundColor: Colors.warn
    }
})