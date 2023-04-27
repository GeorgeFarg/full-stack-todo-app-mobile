import React, {useEffect, useState} from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { EditUserData, GetUserData } from '../api/userApi';
import { Button } from 'react-native';




const Profile = ({navigation}: any) => {
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    
    const logout = () => {
        AsyncStorage.removeItem("token");
        navigation.navigate("Login");
    }

    const updateData = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const data: any = await EditUserData({username, email}, token)
            
            setUsername(data.data.name);
            setEmail(data.data.email);
            
            setEditing(false);
        } catch (error) {
            console.error(error);            
        }

    }
    
    
    useEffect(() => {
        AsyncStorage.getItem("token")
        .then((token: string) => {
            if(!token){
                // navigate to login
                navigation.navigate("Login");
                return null;
            }
            GetUserData(token).then(res => {
                setUsername(res?.data.name);
                setEmail(res?.data.email);
            })
        }).catch(e => console.error(e))
    }
    , [])

  return (
    <View
    style={{flex: 1, paddingHorizontal: 15}}
    >

        <View style={{flex: 1}}>
            <View>
                <Text style={styles.head}>Hello <Text style={styles.name}>{username}</Text>,</Text>
            </View>
            <View>
                <Text style={styles.h2}>Your username:</Text>
                <TextInput 
                style={[  styles.username, editing ? styles.edit : styles.noEdit]} 
                textAlign='center'
                value={username}
                onChangeText={setUsername}
                editable={editing} />
            </View>
            <View>
                <Text style={styles.h2}>Your email:</Text>
                <TextInput 
                style={[styles.username, editing ? styles.edit : styles.noEdit]} 
                textAlign='center'
                value={email}
                onChangeText={setEmail}
                editable={editing} />
            </View>
            
            
            {!editing &&             
            <View style={styles.buttons}>
                <Pressable 
                style={[styles.editBtn, styles.btn]}
                onPress={() => setEditing(true)}
                >
                    <Text style={styles.editText}>
                        Edit 
                        <Image 
                        style={styles.ediIcon}
                        source={require("../assets/edit_icon.png")} /> 
                    </Text>
                </Pressable>

                <Pressable 
                    style={[styles.logout, styles.btn]}
                    onPress={logout}
                >
                    <Text style={styles.logoutText}>Logout </Text>
                </Pressable>
            </View>}

            {editing &&             
            <View style={styles.buttons}>
                <Button 
                title='cancle'onPress={() => setEditing(false)}
                color={"red"}
                />

                <Button 
                title='Save'
                onPress={updateData}
                />
            </View>}


        </View>

    </View>
  )
}
const styles = StyleSheet.create({
    head: {
        fontSize: 25
    },
    name: {
        fontSize:30,
        color:"#2b8dc2",
        textTransform:"capitalize"
    },
    h2: {
        fontSize: 20,
        marginTop: 20,
    },
    username:{
        maxWidth: 250,
        borderRadius: 5,
        marginLeft: 10,
        fontSize: 18,
    },
    noEdit:{
        backgroundColor: "#f0f0f0",
        color:"#909090",
    },
    edit: {
        backgroundColor: "white",
        color:"black",
    },

    btn:{
        borderWidth: 2,
        padding: 5,
        justifyContent:"center",
        alignItems:"center",
    },

    editBtn:{
        width: 80,
        borderColor:"#2b8dc2",
        gap:10,
        borderRadius: 5,
    },
    ediIcon: {
        width: 15,
        height: 15,
    },
    editText: {
        color:"#2b8dc2",
        fontWeight: "600",
        justifyContent:"center",
        alignItems:"center"
    },
    logout: {
        width: 70,
        borderColor:"red",
        borderRadius: 5,
    },
    logoutText: {
        color:"red",
        fontWeight:"600"
    },
    buttons:{
        justifyContent:"center", 
        alignItems:"center", 
        flexDirection:"row", 
        gap: 100, 
        marginTop: 70
    }
});
export default Profile