type Default = Record<string, any>

export interface UseCase<Input = Default, Output = Default> {
  execute: (input: Input) => Promise<Output>
}
