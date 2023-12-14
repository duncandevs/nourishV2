import { View, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native"
import { Text } from "../theme"
import { Button } from "react-native-elements"

export const profilePics = [
    "https://images.unsplash.com/photo-1529900672901-908be5302554?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560233075-4c1e2007908e?q=80&w=2630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1552196634-24a18d82ac56?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D",
    "https://images.unsplash.com/photo-1546608235-3310a2494cdf?q=80&w=2738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1509027572446-af8401acfdc3?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D",
    "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

type ProfilePicPickerProps = {
    onPressPicture: (pic:string)=>void;
    onClose: ()=>void;
}

export const ProfilePicPicker = ({ onPressPicture, onClose }: ProfilePicPickerProps) => {
    return <View style={styles.container}>
        <Text textAlign="center" variant="paragraph3" fontWeight="500">SELECT A NEW PICTURE</Text>
        <FlatList 
            data={profilePics}
            renderItem={({ item: pic })=> {
                return <TouchableOpacity onPress={()=>onPressPicture(pic)}>
                    <Image source={{uri: pic}} width={90} height={90} style={{margin: 8}} borderRadius={8}/>
                </TouchableOpacity>
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
        <Button title="close"  containerStyle={styles.buttonContainer} buttonStyle={styles.button} onPress={onClose}/>
    </View>
};

const styles = StyleSheet.create({
    container: {
        height:225, 
        gap: 24
    },
    buttonContainer: {
        backgroundColor: 'black', 
        borderRadius:20, 
        width: 275, 
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'black'
    }
})
