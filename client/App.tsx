import { Alert, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import Login from './layout/Login';
import SignUp from './layout/Signup';
import Task from './layout/Task';
import List from './layout/List';
import Profile from './layout/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar
      hidden={true}
      />
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerBackVisible: false
          }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={SignUp} />
            <Stack.Screen name='List' component={List} />
            <Stack.Screen name='Task' component={Task} options={{headerBackVisible: true}} />
            <Stack.Screen name='Profile' component={Profile} options={{headerBackVisible: true}} />
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


// <Pressable
//                       onPress={() => navigation.navigate("list")}
//                       style={styles.header}
//                       >
//                         <View style={styles.title}>
//                             <Image style={styles.img} source={require("./assets/arrow.png")} />
//                             <Text style={{fontSize: 25}}>List page</Text>
//                         </View>
//                       </Pressable>

const styles = StyleSheet.create({
  header: {
    height: 80, 
    flexDirection:"row", 
    justifyContent:"space-between", 
    alignItems:"center", 
    paddingBottom: 20
  },
  title: {
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  img: {
    width:45,
    height:45,
    transform: [{rotate: "-90deg"}]
},

})
