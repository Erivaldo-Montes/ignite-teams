import { useState } from "react";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {
  const navigation = useNavigation();

  const [nameGroup, setNameGroup] = useState("");

  function handleNew() {
    navigation.navigate("players", {
      group: nameGroup,
    });
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma nova turma para adicionar pessoas"
        />

        <Input placeholder="nome da turma" onChangeText={setNameGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
