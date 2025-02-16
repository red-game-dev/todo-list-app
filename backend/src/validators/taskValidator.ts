import type { CreateTaskDTO } from '../types';

export function validateCreateTaskDTO(dto: CreateTaskDTO): string | null {
  if (!dto.title) {
    return 'Title is required';
  }

  if (typeof dto.title !== 'string') {
    return 'Title must be a string';
  }

  const trimmedTitle = dto.title.trim();
  if (trimmedTitle.length === 0) {
    return 'Title cannot be empty';
  }

  if (trimmedTitle.length > 1000) {
    return 'Title is too long (maximum 1000 characters)';
  }

  return null;
}
