const ROLE = 'admin'

export const isAdmin = (user) => {
  return user.role == ROLE
}