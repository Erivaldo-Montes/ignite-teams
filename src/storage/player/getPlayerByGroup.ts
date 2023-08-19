import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "../storageConfig";

export async function getPlayerByGroup(group: string) {
  try {
    const data = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
    const storedPlayers: PlayerStorageDTO[] = data ? JSON.parse(data) : [];
    return storedPlayers;
  } catch (error) {
    throw error;
  }
}
