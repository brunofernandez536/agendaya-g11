import { canManageUsers } from '../lib/roles'

describe('canManageUsers', () => {
  test('permite que un ADMIN gestione usuarios', () => {
    expect(canManageUsers('ADMIN')).toBe(true)
  })

  test('no permite que un usuario común gestione usuarios', () => {
    expect(canManageUsers('USER')).toBe(false)
  })
})