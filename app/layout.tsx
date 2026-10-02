import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task List",
  description: "A simple space to organize your tasks, one thing at a time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
