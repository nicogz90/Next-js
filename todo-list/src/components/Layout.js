import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
