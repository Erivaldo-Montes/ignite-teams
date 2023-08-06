import { useState } from 'react';
import { FlatList } from 'react-native';
import { Header } from '@components/Header'
import {GroupCard} from '@components/GroupCard'
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button'
import {ListEmpty} from '@components/ListEmpty'
import { Container,  } from './styles'

export function Groups() {
  const [groups, setGroups] = useState([])

  return (
    <Container>
      <Header />
      <Highlight 
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadatrar a primeira turma?" />}
        renderItem={({item}) => (
          <GroupCard  title={item} />
        )}
      />

      <Button
        type='SECONDARY' 
        title='Criar nova turma' 
      />
    </Container>
  );
}