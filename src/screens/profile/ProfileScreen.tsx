import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AppSafeAreaView from "../../components/view/AppSafeAreaView";
import { Constants } from "../../utils/constant";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../utils/colors";
import AppText from "../../components/texts/AppText";
import { Feather } from "@expo/vector-icons";
// import Avatar from "../../../assets/images/image.png";
import * as ImagePicker from "expo-image-picker";
import ImageViewing from "react-native-image-viewing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../../components/buttons/AppButton";

const Profile = () => {
  const profileOutline = [
    {
      Personalize: [
        "Personalize your profile",
        "Edit your profile",
        "Change your password",
      ],
    },
    {
      Settings: ["Notification preferences", "Language", "Theme", "Logout"],
    },
  ];

  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true, // lets user crop
      aspect: [4, 3], // crop aspect ratio
      quality: 1, // 0 to 1
    });

    if (result.canceled) {
      console.log("User cancelled image picker");
      return;
    } else {
      console.log(result?.assets?.[0]?.uri);
      setImageUri(result?.assets?.[0]?.uri);
    }
  };

  const navigation = useNavigation<any>();
  const logOutPopUp = () => {
    console.log("helo");
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          AsyncStorage.removeItem("token");
          navigation.navigate("SignIn");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <AppText light style={styles.header}>
        Profile
      </AppText>
      <View style={styles.profileContainer}>
        <View>
          <Pressable onPress={() => setIsVisible(true)}>
            <Image
              style={styles.avatar}
              source={
                imageUri
                  ? { uri: imageUri }
                  : require("../../../assets/images/image.png")
              }
            />
          </Pressable>
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <Feather name="camera" size={s(12)} color={"white"} />
          </TouchableOpacity>

          <ImageViewing
            images={[{ uri: imageUri }]}
            imageIndex={0}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
        <AppText style={styles.name}>John Doe</AppText>

        {/* <View style={styles.upGrade}>
          <AppText light style={{ fontSize: s(14) }}>
            Upgrade to Premium
          </AppText>
          <AppButton
            title="Upgrade"
            light={true}
            style={styles.upgradeButton}
            onPress={() => {}}
          />
        </View> */}

        {profileOutline.map((item, i) => (
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              paddingHorizontal: s(12),
            }}
            key={i}
          >
            {item?.Personalize?.map((subItem: any, subIndex: any) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#F3F2F7",
                  padding: s(14),
                  borderTopRightRadius: subIndex == 0 ? s(10) : "0px",
                  borderTopLeftRadius: subIndex == 0 ? s(10) : "0px",
                  borderBottomRightRadius: subIndex == 2 ? s(10) : "0px",
                  borderBottomLeftRadius: subIndex == 2 ? s(10) : "0px",
                  width: "100%",
                }}
                key={subIndex}
              >
                <AppText style={styles.subText}>{subItem}</AppText>
                <Feather name="chevron-right" size={s(24)} />
              </TouchableOpacity>
            ))}
            <View style={{ height: s(10) }} />
            {item?.Settings?.map((subItem: any, subIndex: any) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#F3F2F7",
                  padding: s(14),
                  borderTopRightRadius: subIndex == 0 ? s(10) : "0px",
                  borderTopLeftRadius: subIndex == 0 ? s(10) : "0px",
                  borderBottomRightRadius: subIndex == 3 ? s(10) : "0px",
                  borderBottomLeftRadius: subIndex == 3 ? s(10) : "0px",
                  width: "100%",
                }}
                onPress={() => {
                  subItem === "Logout" && logOutPopUp();
                }}
              >
                <AppText key={subIndex} style={styles.subText}>
                  {subItem}
                </AppText>
                <Feather name="chevron-right" size={s(24)} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: AppColors.primary,
  },
  avatar: {
    width: s(70),
    height: vs(70),
    borderRadius: s(10),
    resizeMode: "cover",
    transform: [{ translateY: -vs(35) }],
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    backgroundColor: AppColors.white,
    width: "100%",
    height: s(390),
    borderTopRightRadius: s(20),
    borderTopLeftRadius: s(20),
    marginTop: vs(100),
  },
  name: {
    fontSize: s(16),
    fontWeight: "bold",
    transform: [{ translateY: -vs(30) }],
  },
  header: {
    fontSize: s(16),
    fontWeight: "bold",
    marginTop: vs(35),
  },
  subText: {
    fontSize: s(14),
    fontWeight: "normal",
    // opacity: 0.5,
  },
  cameraIcon: {
    position: "absolute",
    bottom: vs(30),
    right: s(0),
    backgroundColor: AppColors.primary,
    width: s(25),
    height: s(25),
    borderRadius: s(15),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  upGrade: {
    backgroundColor: AppColors.lightGray,
    padding: s(14),
    borderTopRightRadius: s(10),
    borderTopLeftRadius: s(10),
    borderBottomRightRadius: s(10),
    borderBottomLeftRadius: s(10),
    width: "90%",
    paddingHorizontal: s(20),
    marginHorizontal: s(20),
  },
  upgradeButton: {
    backgroundColor: AppColors.primary,
    padding: s(14),
    borderTopRightRadius: s(10),
    borderTopLeftRadius: s(10),
    borderBottomRightRadius: s(10),
    borderBottomLeftRadius: s(10),
    width: "100%",
  },
  upgradeButtonText: {
    color: AppColors.primary,
    textAlign: "center",
  },
});
