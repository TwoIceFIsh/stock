import {cn} from "@/lib/utils";
import {getHtBalance} from "@/lib/get-ht-balance";
import {MyChart} from "@/components/my-cahrt";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {BadgeCheckIcon, BadgeDollarSignIcon} from "lucide-react";
import {MySetting} from "@/components/my-setting";
import MyStock from "@/components/my-stock";
import MyTimeOut from "@/components/my-time-out";
import {getChartData} from "@/_action/get-chart-data";
import AnimatedNumber from "@/components/animated-number";

export const revalidate = 0;
export default async function Home() {
    const real_data = await getHtBalance()
    const formattedData = await getChartData()

    return (
        <div className={"dark size-full flex-col flex  text-white items-center sm:p-6 gap-6"}>
            <Button className={"fixed right-4 bottom-4 z-20"} asChild={true}>
                <Link href={"https://mezoo.me"} className={"flex  items-center"}>
                    <BadgeCheckIcon fill={"green"} stroke={"white"}/>
                    <div className={"hidden sm:flex"}>미국주식이 미래다 지수로 이동</div>
                </Link>
            </Button>
            <div
                className={"w-full max-w-[700px] flex items-center justify-center border p-6 rounded-2xl "}>
                <div className={"  w-full  space-y-8"}>

                    <div className={"flex flex-col space-y-2"}>
                        <div className={"flex justify-between flex-col"}>
                            <div className={"flex justify-between"}>
                                <div className={"font-bold"}>퍼그가 미래다의 계좌

                                </div>
                                <MyTimeOut/>
                            </div>
                            <div className={"flex gap-2 justify-end"}>
                                <BadgeDollarSignIcon stroke={"black"}
                                                     fill={"yellow"}/> D+{formattedData.length}
                            </div>
                        </div>

                        <div className={"grid grid-cols-2 gap-6"}>
                            <div
                                className={"rounded-xl  px-6 py-4 bg-gray-800 flex flex-col"}>
                                <div>총실현손익</div>
                                <div
                                    className={cn(real_data.output2.ovrs_rlzt_pfls_amt.includes("-") ? "text-blue-600" : "text-red-700", "font-bold text-lg ")}>
                                    <AnimatedNumber value={parseFloat(real_data.output2.ovrs_rlzt_pfls_amt)}
                                                    toDollar={true}/>
                                </div>
                            </div>
                            <div
                                className={"rounded-xl  px-6 py-4 bg-gray-800 flex flex-col"}>
                                <div>총실현수익률</div>
                                <div
                                    className={cn(real_data.output2.rlzt_erng_rt.includes("-") ? "text-blue-600" : "text-red-700", "font-bold text-lg ")}>
                                    <AnimatedNumber value={parseFloat(real_data.output2.rlzt_erng_rt)}
                                                    toPercent={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MyStock real_data={real_data}/>
                </div>
            </div>
            <div className={"max-w-[700px] w-full"}>
                <MyChart data={formattedData} percent={real_data.output2.ovrs_tot_pfls}/>
            </div>
            <div className={"max-w-[700px] w-full "}>
                <MySetting/>
            </div>
        </div>
    );
}