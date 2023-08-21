import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { groupGetAll } from "@storage/group/groupGetAll";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ListEmpty } from "@components/ListEmpty";
import { Container } from "./styles";
import { Loading } from "@components/Loading";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  const [groupIsLoading, setGroupIsLoading] = useState(true);

  function handleNewGroups() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      setGroupIsLoading(true);
      const data = await groupGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setGroupIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      {groupIsLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadatrar a primeira turma?" />
          )}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
        />
      )}

      <Button
        type="PRIMARY"
        title="Criar nova turma"
        onPress={handleNewGroups}
      />
    </Container>
  );
}
