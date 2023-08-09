import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { useState } from "react";

export function Players() {
  const [team, setTeam] = useState("time a");
  const [players, setPlayers] = useState([]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="adicione o nome da turma e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoas" autoCorrect={false} />
        <ButtonIcon type="PRIMARY" icon="add" />
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
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
    </Container>
  );
}
