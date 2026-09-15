import Toast from "react-native-toast-message";

export const showSavedRecipeToast = (message: string = "Saved") => {
  Toast.show({
    type: "saved",
    text1: message,
    visibilityTime: 2500, // 2.5 seconds (between 2-3 sec)
    position: "top",
    topOffset: 55,
  });
};

export const showRemovedRecipeToast = (message: string = "Removed") => {
  Toast.show({
    type: "removed",
    text1: message,
    visibilityTime: 2000,
    position: "top",
    topOffset: 55,
  });
};
