import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlayerByGroup } from "./getPlayerByGroup";
import { PLAYER_COLLECTION } from "../storageConfig";

export async function removePlayerByGroup(playerName: string, group: string) {
  try {
    const players = await getPlayerByGroup(group);

    const newPlayerCollection = players.filter(
      (player) => player.name !== playerName
    );

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(newPlayerCollection)
    );
  } catch (error) {
    throw error;
  }
}
