import { AsyncStorageHook } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { AppError } from "@utils/appError";
import { PLAYER_COLLECTION } from "../storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlayerByGroup } from "./getPlayerByGroup";

export async function addPlayerByGroup(
  player: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await getPlayerByGroup(group);

    const playerAlreadyExist = storedPlayers.filter(
      (item) => item.name === player.name
    );

    if (playerAlreadyExist.length > 0) {
      throw new AppError("Essa pessoa já adicionada em um time.");
    }
    const playerGroup = JSON.stringify([...storedPlayers, player]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playerGroup);
  } catch (error) {
    console.log(error);
  }
}
