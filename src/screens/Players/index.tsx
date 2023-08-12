import { FlatList } from "react-native";
import { useState } from "react";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { PlayerCard } from "@components/PlayerCard";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";

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
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} key={item} onRemove={() => {}} />
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
      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  );
}
