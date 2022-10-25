import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: "#352540",
        flex: 1,
      }}
    >
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
