export {}

export type Roles = 'Admin' | 'User'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}