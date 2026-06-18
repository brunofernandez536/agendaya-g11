export function canManageUsers(role: string): boolean {
  return role === 'ADMIN'
}