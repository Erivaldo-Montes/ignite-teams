import { useState } from "react";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { createGroup } from "@storage/group/groupCreate";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { AppError } from "@utils/appError";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();

  const [nameGroup, setNameGroup] = useState("");

  async function handleNew() {
    try {
      if (nameGroup.trim().length === 0) {
        return Alert.alert("Novo grupo", "Informe o nome da turma");
      }

      await createGroup(nameGroup);
    navigation.navigate("players", {
      group: nameGroup,
    });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo grupo", error.message);
      } else {
        Alert.alert("Novo grupo", "Não possivel criar novo grupo");
        console.log(error);
      }
    }
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
