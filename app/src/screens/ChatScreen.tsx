import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Text } from "../theme";
import { Button, Input } from "react-native-elements";
import { useGptTextChat } from "../domains/chat/hooks";
import ChatService from "../domains/chat/service";
import { ChatUser, ChatMessage as ChatMessageType } from "../domains/chat/types";
import AiIcon from '../../assets/ai-sparkles.svg';
import { useProfilePicture } from "../domains/users/hooks";

/*
    https://www.npmjs.com/package/react-native-markdown-display - for markdown display
*/

export const ChatMessage = ({ chatMsg }: {chatMsg: ChatMessageType }) => {
    const { userProfilePic } = useProfilePicture();
    const isChatUserAi = chatMsg?.user === 'ai';
    const isChatUser = chatMsg?.user === 'user';
    return <View style={{gap: 12}}>
        {isChatUserAi && <View style={{flexDirection: 'row', gap:8, alignItems: 'center'}}>
            <AiIcon width={20} height={20} fill="black"/>
            <Text fontWeight="600">ARA</Text>
        </View>}
        {isChatUser && <View style={{flexDirection: 'row', gap:4, alignItems: 'center'}}>
            <Image source={{uri: userProfilePic}} width={30} height={30} borderRadius={15} />
            <Text fontWeight="600">YOU</Text>
        </View>}
        <Text>{chatMsg.message}</Text>
    </View>
}

export const ChatScreen = () => {
    const [userMessage, setUserMessage] = useState('');
    const { getChatResponse, isGetChatResponseLoading} = useGptTextChat();
    const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

    const addNewMessage = async (message: string, user: ChatUser)=>{
        const chatMessage = { user, message };
        setChatMessages((prevMessages) => {
            if(prevMessages) return [...prevMessages, chatMessage]
            return [chatMessage]
        });
    };

    const handleChatReponse = async () => {
        addNewMessage(userMessage, 'user');
        const chatResponse: string = await getChatResponse(userMessage);
        if(chatResponse) {
            addNewMessage(chatResponse, 'ai');
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
                    {chatMessages?.map((chatMsg: ChatMessageType, idx:number)=>{
                        return <View key={idx}>
                            <ChatMessage chatMsg={chatMsg} />
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
        gap: 36
    },
    chatText: {
        fontSize: 18
    }
});