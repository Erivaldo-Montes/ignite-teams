import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION, GROUP_COLLECTION } from "../storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function removeGroupByName(groupName: string) {
  try {
    const groupStored = await groupGetAll();
    const newGroupCollection = groupStored.filter(
      (group) => group !== groupName
    );

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(newGroupCollection)
    );
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${GROUP_COLLECTION}`);
  } catch (error) {
    throw error;
  }
}
