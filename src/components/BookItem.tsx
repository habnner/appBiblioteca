// src/components/BookItem.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../types/book';

interface BookItemProps {
  book: Book;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BookItem({ book, onToggleRead, onDelete }: BookItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.genre}>{book.genre}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.statusButton, book.isRead ? styles.read : styles.pending]}
          onPress={() => onToggleRead(book.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.statusText}>{book.isRead ? 'Lido' : 'Pendente'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(book.id)} activeOpacity={0.6}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  genre: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  actions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusButton: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  read: {
    backgroundColor: '#2c6e49',
  },
  pending: {
    backgroundColor: '#b7791f',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#c0392b',
    fontSize: 13,
  },
});
