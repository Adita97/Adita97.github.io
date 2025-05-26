declare module './App' {
  const App: React.FC;
  export default App;
}

declare module '*.jsx' {
  const component: React.FC;
  export default component;
} 