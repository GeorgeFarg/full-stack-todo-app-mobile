import React, {useState} from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddTask } from '../api/TaskApi';
const Task = ({navigation}: any) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isFinished, setIsFinished] = useState(false)

    const handleSubmit = async () => {
        if(!title) return;
        try {
            const token = await AsyncStorage.getItem("token");
            const result: any = await AddTask({title, description, isFinished}, token);
            if(result?.status !== 200) console.error("Not added")
            navigation.navigate("List");
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <KeyboardAvoidingView 
    behavior='padding'
    style={{
        flex: 1,
        alignItems:"center", 
        justifyContent:"flex-start",
        
        }}>
        <View style={{ height: 80, width: 300, justifyContent: "center"}}>
            <Text style={{fontSize: 30}}>Add a Task</Text>
        </View>
        <View
        style={{width:"90%"}}
        >
            <TextInput 
            value={title} 
            onChangeText={setTitle}  
            placeholder="title" 
            style={[{
                height: 40
            }, styles.textInput]} />

            <TextInput 
            value={description} 
            onChangeText={setDescription}  
            placeholder="description" 
            multiline={true}
            style={[ {
                marginTop: 30, 
                height: 200,
                textAlignVertical:"top" ,
                paddingVertical: 10
                } ,styles.textInput]} />
            
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <Switch 
                onChange={() => setIsFinished(!isFinished)}
                value={isFinished}
                style={{alignSelf: "flex-start"}}
                />
                <Text> is finished</Text>
            </View>
        </View>
        <View style={{flexDirection:"row", gap: 20, marginTop: 20}}>
            <Button 
            title='Cancle'
            color={"red"}
            onPress={() => navigation.navigate("List")}
            />
            <Button 
            title='Save'
            onPress={handleSubmit}
            />
        </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        width: "100%",
        paddingHorizontal: 15,
        fontSize: 18
    }
})

export default Task