import { Navbar1 } from "@/components/modules/layout/navbar1"

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl">
        <Navbar1 />

        {children}
      </div>
    </>
  )
}

export default CommonLayout
