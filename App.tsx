// App.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Book } from './src/types/book';
import BookForm from './src/components/BookForm';
import BookItem from './src/components/BookItem';

export default function App() {
  // Estado para armazenar a lista de livros em memória
  const [books, setBooks] = useState<Book[]>([
    { id: '1', title: 'O Homem mais rico da Babilônia', author: 'George S. Clason', genre: 'Finanças Pessoais', isRead: true },
    { id: '2', title: 'Diário de um Banana 1', author: 'Jeff Kenney', genre: 'Aventura', isRead: false },
  ]);

  // Função para cadastrar um novo livro
  const handleAddBook = (title: string, author: string, genre: string) => {
    const newBook: Book = {
      id: Date.now().toString(), // ID único baseado no timestamp atual
      title,
      author,
      genre,
      isRead: false, // Todo livro novo começa como não lido
    };

    setBooks((prevBooks) => [newBook, ...prevBooks]); // Adiciona no topo da lista
  };

  // Função para alternar o estado de lido/pendente
  const handleToggleRead = (id: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isRead: !book.isRead } : book
      )
    );
  };

  // Função para excluir um livro
  const handleDeleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com Título e Identificação do Aplicativo */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>📚 Minha Biblioteca</Text>
        <Text style={styles.appSubtitle}>Gerenciador pessoal de leituras</Text>
      </View>

      {/* Formulário de Cadastro (Componente Personalizado 1) */}
      <BookForm onAddBook={handleAddBook} />

      <Text style={styles.listHeaderTitle}>Livros Cadastrados ({books.length})</Text>

      {/* Lista Dinâmica com FlatList e Componente Personalizado 2 */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            onToggleRead={handleToggleRead}
            onDelete={handleDeleteBook}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum livro cadastrado ainda.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  listHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});