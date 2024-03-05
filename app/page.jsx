// NEXT JS
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-start bg-white overflow-x-hidden select-none">
        <div className="relative hidden sm:hidden md:flex lg:flex xl:flex justify-center items-center w-full text-[#191919]">
          <Link href="/flowers" className="flex justify-center items-center w-full no-outline">
            <div className="absolute right-8 flex justify-end items-center w-full">
              <div className="flex flex-col justify-end items-center w-full text-right">
                <div className="flex justify-end items-center w-full text-4xl font-semibold leading-none font_libre">
                  <div className="flex justify-end items-center w-[40%]">
                    Exquisite Joy, Birthday Bouquets Await
                  </div>
                </div>
                <div className="flex justify-end items-center w-full mt-2 text-lg font-semibold leading-none">
                  <div className="flex justify-end items-center w-[40%]">
                    Commend the sun's voyage with euphoric, mood-enhancing floral masterpieces.
                  </div>
                </div>

                <div className="flex justify-end items-center w-full mt-4 text-lg font-semibold leading-none">
                  <div className="flex justify-end items-center w-[40%]">
                    <Link href="/flowers" className="flex justify-center items-center w-auto">
                      <button className="flex justify-center items-center w-auto h-10 px-3.5 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded-md">
                        <div> Shop Birthday </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center w-full p-0 overflow-hidden">
              <Image className="flex justify-center items-center w-full h-full overflow-hidden"
                src={"https://i.ibb.co/N3GYdK4/0215-HPUpdate-For-Every-Ocasssion-HPPods-Subs-Desktop-L.jpg"}
                width={1400}
                height={535}
                alt="banner_01"
              />
            </div>
          </Link>
        </div>

        <div className="relative flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full text-[#191919]">
          <Link href="/flowers" className="flex flex-col justify-center items-center w-full no-outline">
            <div className="flex justify-center items-center w-full p-0 overflow-hidden">
              <Image className="flex justify-center items-center w-full h-full overflow-hidden"
                src={"https://i.ibb.co/vsrVHwW/0215-HPUpdate-For-Every-Ocasssion-HPPods-Subs-Mobile.jpg"}
                width={480}
                height={426}
                alt="banner_01__mobile"
              />
            </div>

            <div className="flex justify-center items-center w-full py-6 px-2 bg-[#FCEBB5]">
              <div className="flex flex-col justify-center items-center w-full text-center">
                <div className="flex justify-center items-center w-full text-[1.8rem] font-semibold leading-tight font_libre">
                  <div className="flex justify-center items-center w-full">
                    Exquisite Joy, Birthday Bouquets Await
                  </div>
                </div>
                <div className="flex justify-center items-center w-full mt-1 text-lg font-semibold leading-tight">
                  <div className="flex justify-center items-center w-full">
                    Commend the sun's voyage with euphoric, mood-enhancing floral masterpieces.
                  </div>
                </div>

                <div className="flex justify-center items-center w-full mt-4 text-lg font-semibold leading-none">
                  <div className="flex justify-center items-center w-[40%]">
                    <Link href="/flowers" className="flex justify-center items-center w-auto">
                      <button className="flex justify-center items-center w-auto h-[2.75rem] px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded-md">
                        <div> Shop Birthday </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}