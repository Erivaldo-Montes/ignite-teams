import { Alert, FlatList, TextInput, Keyboard } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { getPlayerByGroupAndTeam } from "@storage/player/getPlayerByGroupAndTeam";
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayerByGroup } from "@storage/player/getPlayerByGroup";
import { removeGroupByName } from "@storage/group/removeGroupByName";
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup";

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { PlayerCard } from "@components/PlayerCard";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";

import { AppError } from "@utils/appError";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("time a");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const route = useRoute();
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const { group } = route.params as RouteParams;
  const navigation = useNavigation();
  const [isPlayerLoading, setIsPlayerLoading] = useState(true);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Novo Player",
        "Informe o nome da pessoa para adicionar"
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await addPlayerByGroup(newPlayer, group);
      setNewPlayerName("");
      // tira o focu do input
      newPlayerNameInputRef.current?.blur();
      Keyboard.dismiss();
      fetchPlayerByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não possível criar player");
      }
    }
  }

  async function fetchPlayerByTeam() {
    try {
      setIsPlayerLoading(true);
      const playersByTeam = await getPlayerByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possivel carregar pessoas");
    } finally {
      setIsPlayerLoading(false);
    }
  }

  async function removeGroup() {
    try {
      await removeGroupByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possivel remover grupo");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeGroup() },
    ]);
  }

  async function handleRemoverPlayerByGroup(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      const playerByTeam = await getPlayerByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não possivel remover o player");
    }
  }

  useEffect(() => {
    fetchPlayerByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="adicione o nome da turma e separe os times"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoas"
          value={newPlayerName}
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon type="PRIMARY" icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["time a", "time b"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isPlayerLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={handleRemoverPlayerByGroup}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
