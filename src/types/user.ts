export interface User {
  name: string;
  email: string;
  inn?: string;
  role: string;
}

export type UserRole = 'Владелец' | 'Менеджер' | 'Сотрудник' | 'Клиент';