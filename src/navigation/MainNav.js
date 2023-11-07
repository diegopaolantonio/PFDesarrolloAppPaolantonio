import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import TabNav from "./TabNav";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUid, setUserData } from "../redux/slice/authSlice";
import { useGetUsersQuery } from "../services/daApi";

const MainNav = () => {
  const dispatch = useDispatch();
  const [checkedUserId, setCheckedUserId] = useState(null);
  const uid = useSelector((state) => state.authSlice.uid);
  let userId = null;
  const {
    data: users,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetUsersQuery();

  const checkUser = async () => {
    try {
      userId = await AsyncStorage.getItem("userId");
      if (userId) {
        setCheckedUserId(userId);
        dispatch(setUid(userId));
        console.log(users[userId]);
        dispatch(setUserData(users[userId]));
      } else {
        setCheckedUserId(uid);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refetch();
    checkUser();
  }, [uid]);

  return (
    <NavigationContainer>
      {checkedUserId ? <TabNav /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default MainNav;
