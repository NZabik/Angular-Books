interface Book {
  id: number;
  title: string;
  coverText: string;
  comment: string;
}

export default interface Author {
  id: number;
  firstName: string;
  lastName: string;
  books: Book[];
}
