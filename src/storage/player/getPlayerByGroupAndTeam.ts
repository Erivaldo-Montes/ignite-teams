import { getPlayerByGroup } from "./getPlayerByGroup";

export async function getPlayerByGroupAndTeam(group: string, team: string) {
  try {
    const data = await getPlayerByGroup(group);

    const teamPlayers = data.filter((player) => player.team === team);

    return teamPlayers;
  } catch (error) {
    throw error;
  }
}
