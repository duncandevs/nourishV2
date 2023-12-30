import { View, Image, StyleSheet } from "react-native";
import { Text } from "../theme";
import { useProfilePicture } from "../domains/users/hooks";
import AiIcon from '../../assets/ai-sparkles.svg';
import { ChatMessage as ChatMessageType } from "../domains/chat/types";

export const ChatMessage = ({ chatMsg }: {chatMsg: ChatMessageType }) => {
    const { userProfilePic } = useProfilePicture();
    const isChatUserAi = chatMsg?.user === 'ai';
    const isChatUser = chatMsg?.user === 'user';

    return <View style={styles.container}>
        {isChatUserAi && <View style={styles.aiWrapper}>
            <AiIcon width={20} height={20} fill="black"/>
            <Text fontWeight="600">ARA</Text>
        </View>}
        {isChatUser && <View style={styles.userWrapper}>
            <Image source={{uri: userProfilePic}} width={30} height={30} borderRadius={15}/>
            <Text fontWeight="600">YOU</Text>
        </View>}
        <Text>{chatMsg.message}</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
        gap: 12
    },
    aiWrapper: {
        flexDirection: 'row', 
        gap:8, 
        alignItems: 'center'
    },
    userWrapper: {
        flexDirection: 'row', 
        gap:8, 
        alignItems: 'center'
    }
});