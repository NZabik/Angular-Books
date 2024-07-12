interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

export default interface Book {
  id: number;
  title: string,
  coverText: string,
  comment: string,
  author: Author
}
