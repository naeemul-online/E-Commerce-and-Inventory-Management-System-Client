import { Navbar } from "@/components/navigation"

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-4">{children}</div>
    </>
  )
}

export default CommonLayout
