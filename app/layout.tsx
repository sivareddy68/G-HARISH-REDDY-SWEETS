import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harish Reddy Sweets | Premium Indian Sweets",
  description:
    "Discover authentic Indian sweets, premium gift boxes and celebration catering at Harish Reddy Sweets, Chintal, Hyderabad.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}