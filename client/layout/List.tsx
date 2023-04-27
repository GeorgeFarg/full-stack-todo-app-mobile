import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Pressable, StyleSheet, Text, View, Image, RefreshControl } from 'react-native'
import ListItem from './components/ListItem'
import EmptyList from './components/EmptyList'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetFullList } from '../api/ListApi';


const List = ({navigation}: any) => {

    const [list, setlist] = useState([])
    const [refreshing, setRefreshing] = useState(false);


    const loadUserData = async () => {
        setRefreshing(true);
        const token = await AsyncStorage.getItem("token");
        const data: any = await GetFullList(token).then(res => {
            setlist(res?.data)
        })
         setRefreshing(false);
    }

    useEffect(() => {
        AsyncStorage.getItem("token")
        .then((token: string) => {
            if(!token){
                // navigate to login
                navigation.navigate("Login");
                return null;
            }
            GetFullList(token).then(res => {
                setlist(res?.data)
            })
        }).catch(e => console.error(e))
    }
    , [])
    

  return (
    <>
        <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{
            height: 80, 
            flexDirection:"row", 
            justifyContent:"space-between", 
            alignItems:"center", 
            paddingHorizontal: 30 
        }}>
            <Text style={{fontSize: 25}}>List page</Text>
            <Image 
            style={{width: 35, height: 35}}
            source={require("../assets/icons8-settings-250.png")} />
        </Pressable>
        <View style={{flex:1, }}>
            <FlatList
            data={list}
            renderItem={({item}: any) => (<ListItem navigation={navigation} id={item.id} title={item.title} describtion={item.description} isFinished={item.isFinished} />)}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={<View style={{height:10}} />}
            ListEmptyComponent={<EmptyList />}
            refreshing={refreshing}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
              }
              
            >
                
            </FlatList>
        </View>


        <Pressable 
        onPress={() => navigation.navigate("Task")}
        style={{alignItems:"center", justifyContent:"center"}} >
            <View style={styles.btn}>
                <View >
                    <Text style={{color:"white", fontSize: 35, alignItems:"center", justifyContent:"center", top: -2}} >+</Text>
                </View>
            </View>
        </Pressable>
    </>
  )
}



const styles = StyleSheet.create({
    btn: {
        position:"absolute",
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#2b8dc2",
        bottom: 40,
        right: 20,

    }
})




const dummy = [
    {
        id:"0",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: true,  
    },
    {
        id:"1",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: false,  
    },    {
        id:"2",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: true,  
    },    {
        id:"3",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: false,  
    },    {
        id:"4",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: true,  
    },{
        id:"5",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: true,  
    },{
        id:"6",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: true,  
    },{
        id:"7",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: true,  
    },{
        id:"8",
        title: "Task",
        describtion:"This is the describtion of the task"  ,
        isFinished: true,  
    },
]
export default List