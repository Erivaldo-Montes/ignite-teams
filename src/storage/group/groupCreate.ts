import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@utils/appError";
export async function createGroup(groupName: string) {
  try {
    const storedGroups = await groupGetAll();

    const groupAlreadyExists = storedGroups.includes(groupName);

    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo com esse nome");
    }

    const groups = JSON.stringify([...storedGroups, groupName]);
    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
  } catch (error) {
    // lança o error para quem chamou
    throw error;
  }
}
