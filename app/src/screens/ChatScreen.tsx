import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Text } from "../theme";
import { Button, Input } from "react-native-elements";
import { useGptTextChat } from "../domains/chat/hooks";
import ChatService from "../domains/chat/service";

/*
    https://www.npmjs.com/package/react-native-markdown-display - for markdown display
*/

export const ChatScreen = () => {
    const [userMessage, setUserMessage] = useState('');
    const { getChatResponse, isGetChatResponseLoading} = useGptTextChat();
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    const addNewMessage = async (message: string)=>{
        setChatMessages(prevMessages => [...prevMessages, message]);
    };

    const handleChatReponse = async () => {
        await addNewMessage(userMessage);
        const chatResponse: string = await getChatResponse(userMessage);
        if(chatResponse) {
            await addNewMessage(chatResponse)
        };
    };

    useEffect(()=>{
        ChatService.loadChatMessagesToStorage().then((msgs)=>{
            setChatMessages(msgs);
        })
    }, []);

    return <SafeAreaView style={styles.container}>
            <ScrollView>
                {<View style={styles.chatBox}>
                    {chatMessages?.map((msg: string, idx:number)=>{
                        return <View key={idx}>
                            <Text color="black">{msg}</Text>
                        </View>
                    })}
                    {isGetChatResponseLoading && 
                        <Text>Loading...</Text>
                    }
                </View>}
            </ScrollView>
            <View>
                <Input onChangeText={(text)=>setUserMessage(text)} inputStyle={{color: 'black'}}/>
                <Button title="send" onPress={handleChatReponse}/>
            </View>
        </SafeAreaView>
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.gray01
    },
    chatBox: {
        padding: 20,
        paddingTop: 60,
    },
    chatText: {
        fontSize: 18
    }
});