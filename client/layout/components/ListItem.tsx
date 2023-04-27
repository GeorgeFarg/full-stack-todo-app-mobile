import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { removeTask } from "../../api/TaskApi";

interface listItem {
  title: String,
  describtion: String,
  isFinished: boolean
}

const ListItem = ({id, title, describtion, isFinished, navigation}: any) => {
    const [details, setDetails] = useState(false);
    const [finished, setfinished] = useState(isFinished)
    
    const deleteItem = async () => {
      const token = await AsyncStorage.getItem("token");
      const result = await removeTask(id, token);
      console.log(result);

    }


    const onpress = () => {
      if (finished) return setDetails(false)
      setDetails(!details);
    }

    return (
        <>
        <Pressable onPress={ onpress }
        style={styles.task}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <BouncyCheckbox 
              fillColor="#2b8dc2"
              isChecked={finished}
              onPress={(isChecked) =>{
                setfinished(!finished)
                if(isChecked) setDetails(false)
              } }
              />
            <View style={[{display: finished ? "flex" : "none", width: finished ? "70%" : 0 ,}, styles.line]} />
            <Text  style={{ flex: 1, fontSize: 20 }}>{title}</Text>
              <Pressable 
              onPress={deleteItem}
              style={styles.arrow} >
                <Image 
                source={require("../../assets/delete.png")}
                style={{
                  width:"100%",
                  height:"100%",
                }}
                />
              </Pressable>
          </View>
        <Text style={{ 
          fontSize: 16, 
          marginTop: 10, 
          display: details ? "flex" : "none" 
          }}>
            {describtion}
          </Text>
      </Pressable></>
      )
    };
    
    const styles = StyleSheet.create({
      task: {
        backgroundColor: "#e9e9e9",
        padding: 20,
        width: "90%",
        alignSelf: "center",
        borderRadius: 20
      },
      line: {
        backgroundColor:"#2b8dc2", 
        position:"absolute", 
        height: 5, 
        alignSelf:"stretch",
        top: "50%", 
        marginLeft: 40,
        zIndex:50,
        borderRadius: 5
        },
      arrow: {
        width:30,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 100,
        alignSelf:"flex-end",
        overflow:"hidden"
      }
    });


export default ListItem;