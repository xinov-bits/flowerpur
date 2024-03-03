// NEXT JS
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-start bg-white overflow-x-hidden select-none">
        <div className="relative flex justify-center items-center">
          <Link href="/flowers">
            <div className="flex justify-center items-center">
              <Image src={"/assets/banners/banner_01b.png"} alt="banner_01" width={1624} height={600} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}