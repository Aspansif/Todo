export interface ITodo {
  id: number;
  attributes: {
    title: string;
    description: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}

export interface IOptions {
  value: string;
  name: string;
}
