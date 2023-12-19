import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "../theme";
import { getChatResponse } from "../domains/chat/service";
import { Button, Input } from "react-native-elements";

export const ChatScreen = () => {
    const [message, setMessage] = useState('');

    const handleChatReponse = async () => {
       const chatResponse = await getChatResponse(message);
    };

    return <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text variant="header2" textAlign="center">Chat Screen</Text>
                <Input onChangeText={(text)=>setMessage(text)}/>
                <Button title="send" onPress={handleChatReponse}/>
            </ScrollView>
        </SafeAreaView>
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    }
});