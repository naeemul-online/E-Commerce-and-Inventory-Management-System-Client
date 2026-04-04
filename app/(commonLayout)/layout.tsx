import { Navbar1 } from "@/components/navbar1"

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container mx-auto w-full max-w-7xl">
        <Navbar1 />
        {children}
      </div>
    </>
  )
}

export default CommonLayout
