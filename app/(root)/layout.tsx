// the way of overriding the default metadata
// it's gonna look like Home | My E-Commerce Store
export const metadata = {
  title: 'Home',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <main className="w-full max-w-7xl flex-1 p-5 md:px-10 lg:mx-auto">
        {children}
      </main>
    </div>
  );
}
