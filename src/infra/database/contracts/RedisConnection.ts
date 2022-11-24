export interface DatabaseConnection {
  get: (key: string) => Promise<string | undefined>
  set: (key: string, value: string) => Promise<boolean>
  delete: (key: string) => Promise<boolean>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}
