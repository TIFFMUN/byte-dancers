import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import {
  Pressable,
  useColorScheme,
  Button,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import GoBackButton from "../../components/GoBackButton";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation(""); // Get navigation instance
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgba(57, 118, 132)",
        tabBarInactiveTintColor: "rgba(57, 118, 132, 0.5)",
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false, // Hide the header for this screen
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerStyle: {
            backgroundColor: "white", // Change the top bar background color
            height: 80,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 20, // Change the font size
            color: "black", // Change the text color
          },
          headerTitleAlign: "center",
          headerLeft: () => <GoBackButton />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfer",
          headerStyle: {
            backgroundColor: "white", // Change the top bar background color
            height: 80,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 20, // Change the font size
            color: "black", // Change the text color
          },
          headerTitleAlign: "center",
          headerLeft: () => <GoBackButton />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="topup"
        options={{
          title: "Top Up",
          headerStyle: {
            backgroundColor: "white", // Change the top bar background color
            height: 80,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 20, // Change the font size
            color: "black", // Change the text color
          },
          headerTitleAlign: "center",
          headerLeft: () => <GoBackButton />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: "Card",
          headerStyle: {
            backgroundColor: "white", // Change the top bar background color
            height: 80,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 20, // Change the font size
            color: "black", // Change the text color
          },
          headerTitleAlign: "center",
          headerLeft: () => <GoBackButton />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
      name="scanToPay"
      options={{
        title: "Scan QR Code",
        headerStyle: {
          backgroundColor: "white", // Change the top bar background color
          height: 80,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20, // Change the font size
          color: "black", // Change the text color
        },
        headerTitleAlign: "center",
        headerLeft: () => <GoBackButton />,
        tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
      }}
    />
    </Tabs>
  );
}
