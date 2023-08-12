import { useState } from "react";
import { FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ListEmpty } from "@components/ListEmpty";
import { Container } from "./styles";

type RootParamList = {
  new: undefined;
  group: undefined;
  player: {
    group: string;
  };
};

type Props = {
  navigation: NativeStackNavigationProp<RootParamList, "group">;
};

export function Groups({ navigation }: Props) {
  const [groups, setGroups] = useState([]);

  function handleNewGroups() {
    navigation.navigate("new");
  }
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadatrar a primeira turma?" />
        )}
        renderItem={({ item }) => <GroupCard title={item} />}
      />

      <Button
        type="PRIMARY"
        title="Criar nova turma"
        onPress={handleNewGroups}
      />
    </Container>
  );
}
