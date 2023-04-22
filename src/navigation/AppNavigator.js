import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {SignInScreen, SignUpScreen} from "../screens/AuthScreens";
import ProductForm from "../screens/ProductForm";
import ProductPriceHistoryScreen from "../screens/ProductPriceHistoryScreen";
import UpdateProductScreen from "../screens/UpdateProductScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import ProductsByCategoryScreen from "../screens/ProductsByCategoryScreen";
import CreateProductScreen from "../screens/CreateProductScreen";
import {useSelector} from "react-redux";
import {Text, View} from "react-native";
import {IconButton} from "react-native-paper";
import CartScreen from "../screens/CartScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import CustomerListScreen from "../screens/CustomerListScreen";
import CustomerSuppliersScreen from "../screens/CustomerSuppliersScreen";

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{title: "Sign In"}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: "Sign Up"}}
      />
      <AuthStack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{title: "Sign Up"}}
      />
    </AuthStack.Navigator>
  );
};

function HomeDrawer() {
  const {cartItems} = useSelector((state) => state.cart);
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="ProductsByCategoryScreen"
        component={ProductsByCategoryScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <IconButton
                icon="cart"
                color="white"
                onPress={() => navigation.navigate("Cart")}
              />
              {cartItems.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "red",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{color: "white", fontSize: 12}}>
                    {cartItems.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        })}
      />
      <Drawer.Screen name="Main" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const AppStackNavigator = () => {
  const {cartItems} = useSelector((state) => state.cart);
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={HomeDrawer}
        options={{headerShown: false}}
      />
      <AppStack.Screen name="Profile" component={SettingsScreen} />
      <AppStack.Screen name="ProductList" component={ProductListScreen} />
      <AppStack.Screen name="NewProduct" component={ProductForm} />
      <AppStack.Screen
        name="ProductsByCategoryScreen"
        component={ProductsByCategoryScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <IconButton
                icon="cart"
                color="white"
                onPress={() => navigation.navigate("Cart")}
              />
              {cartItems.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "red",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{color: "white", fontSize: 12}}>
                    {cartItems.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        })}
      />
      <AppStack.Screen name="Cart" component={CartScreen} />
      <AppStack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <AppStack.Screen
        name="ProductPriceHistoryScreen"
        component={ProductPriceHistoryScreen}
      />
      <AppStack.Screen
        name="UpdateProductScreen"
        component={UpdateProductScreen}
      />
      <AppStack.Screen
        name="CustomerSuppliersScreen"
        component={CustomerSuppliersScreen}
      />
      <AppStack.Screen
        name="CreateProductScreen"
        component={CreateProductScreen}
      />
      <AppStack.Screen
        name="CustomerListScreen"
        component={CustomerListScreen}
      />
    </AppStack.Navigator>
  );
};

const AppNavigator = ({isSignedIn}) => {
  console.log(isSignedIn);
  return (
    <NavigationContainer>
      {isSignedIn ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
