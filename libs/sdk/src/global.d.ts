declare module '*.wasm' {
  const func: (
    imports: WebAssembly.Imports,
  ) => Promise<WebAssembly.WebAssemblyInstantiatedSource>
  export default func
}

interface Window {
  Go: typeof Go
}
