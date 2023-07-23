import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "25px" }}>{children}</main>
    </>
  );
}
