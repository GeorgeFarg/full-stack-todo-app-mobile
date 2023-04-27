import { useState } from 'react';
import { View, StyleSheet, Button, Image, TextInput, Text, KeyboardAvoidingView, Pressable} from 'react-native'
import Header from './components/Header';
import { userSignup } from '../api/userApi';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = ({navigation}: any) => {
    const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, Setloading] = useState(false)




  const handleSubmit = async () => {
    Setloading(true);
    try {
      const data: any = await userSignup({
        name: username,
        email,
        password
      })

      if (data.status !== 200) {
        Setloading(false);
        return console.log("Wrong creds");
      }
      console.log(data.data);
      Setloading(false);
      AsyncStorage.setItem("token", data.data.token);
      // navigate to list
      navigation.navigate("List");
    } catch (err) {
      console.error(err);
      Setloading(false);
    }
  }


  return (
        <KeyboardAvoidingView style={styles.container}>
            <Header h1='Welcome!' h2='Create your account' />
            <View style={styles.body}>
                <View style={styles.input}>
                    <Image style={styles.icon} source={require('../assets/mail_icon.png')} /> 
                    <TextInput 
                    style={styles.text_input}
                    placeholder = {"Email..."}
                    value={email} 
                    onChangeText={setEmail} />
              </View>  
              <View style={styles.input}>
                <Image style={styles.icon} source={require('../assets/user_icon.png')} /> 
                <TextInput 
                style={styles.text_input}
                placeholder = {"Username..."}
                value={username} 
                onChangeText={setUsername} />
              </View>
              <View style={styles.input}>
                <Image style={styles.icon} source={require('../assets/password_icon.png')} /> 
                <TextInput 
                style={styles.text_input}
                placeholder = {"Password..."}
                value={password} 
                onChangeText={setPassword} />
              </View>
              <View style={{width: 150, alignSelf:"center", borderRadius: 5, overflow:"hidden"}}>
                <Button  disabled={loading ? true : false} title='Sign in' onPress={handleSubmit} />
              </View>
            </View>
            <View style={{backgroundColor:"white", width: 280, flex:1, borderTopWidth: 1}}>
              <Text 
                style={styles.choice}>
                Or sign in with
              </Text>
              <View style={styles.accounts}>
                <View style={styles.account}>
                  <Image style={styles.account_img} source={require("../assets/google.png")} />
                </View>
                <View style={styles.account}>
                  <Image style={styles.account_img} source={require("../assets/Facebook_Logo_(2019).png")} />
                </View>
                <View style={styles.account}>
                  <Image style={{width: 40, height:33}} source={require("../assets/twitter.png")} />
                </View>
              </View>

              <View style={{alignItems:"center", justifyContent:"center", marginTop:40, flexDirection:"row"}}>
                <Text>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text style={{color:"blue"}}> Login</Text>
                </Pressable>
              </View>
              
            </View>
        </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white", //
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    body: {
        backgroundColor: "white", 
        width: 240,
        flex:1.5,
        justifyContent: "space-evenly",
    },
       input: {
        width:100,
        flexDirection:"row",
        alignItems:"center",
        gap: 5
    },
    icon: {
        width: 30,
        height: 30,
    },
    text_input: {
        width: 200,
        height: 30,
        borderWidth: 1,
        display:"flex",
        alignItems:"center",
        padding: 5,
        borderRadius: 5
    },
    choice: {
      alignSelf:"center",
      position:"absolute",
      top:-11,
      paddingHorizontal: 10, 
      backgroundColor:"white"
    },
    accounts: {
      flexDirection:"row",
      width:280,
      justifyContent:"space-around",
      alignItems:"center", 
      height:70, 
    },
    account: {
      marginTop: 10,
      borderRadius: 5,
      width: 60,
      height: 40,
      justifyContent:"center",
      alignItems:"center"
    },
    account_img: {
      width:30,
      height:30
    }
  });
  

export default Signup