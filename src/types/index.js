export type BabelTypes = {
  [key: string]: () => mixed,
}

// Temporary for AVA
// Can be removed when this lands: https://github.com/avajs/ava/issues/1114
type TestContext = AssertContext & {
  plan(count: number): void,
  skip: AssertContext,
}
type ContextualTestContext = TestContext & { context: any }

export type ContextualTest =
  (t: ContextualTestContext) => SpecialReturnTypes | void
