"use client"
import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import AnimatedNumber from "@/components/animated-number";
import {LoaderIcon} from "lucide-react";


interface StockProps {
    real_data: any;
}

const MyStock = ({real_data}: StockProps) => {
    const colors = ["bg-red-600", "bg-blue-600", "bg-green-600", "bg-yellow-600"];
    const [data, setData] = useState(real_data);


    useEffect(() => {
        const interval = setInterval(() => {
            // real_data를 갱신하는 로직이 필요하다면 여기에 추가하세요.
            // 아래는 예시로, 만약 서버로부터 데이터를 다시 받아온다면 다음과 같이 할 수 있습니다.
            fetch('/api/v1/balance', {
                cache: "no-cache",
            })  // 실제 데이터를 가져오는 API 경로
                .then(response => response.json())
                .then(newData => {
                    setData(newData.data)
                });
        }, 10000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            {data.output1.length !== 0 && (<>
                <div className={"flex flex-col mb-2"}>
                    <div className={"text-lg font-bold flex gap-2 items-center"}><LoaderIcon
                        className={"h-5 w-5 animate-spin stroke-yellow-300"}/> 실시간 내 투자
                    </div>
                    <div className={"text-2xl font-bold"}>
                        $ <AnimatedNumber
                        value={parseFloat(data.output2.tot_evlu_pfls_amt)} toDollar={true}/>
                    </div>

                    <div
                        className={cn(data.output2.ovrs_tot_pfls.includes("-") ? "text-blue-600" : "text-red-700", "font-bold text-lg ")}>
                        <AnimatedNumber
                            value={parseFloat(data.output2.ovrs_tot_pfls)}
                            toDollar={true}/> (<AnimatedNumber value={parseFloat(data.output2.tot_pftrt)}
                                                               toPercent={true}/>)
                    </div>

                </div>
                {data.output1.map((item: any, index: any) => {
                    const bgColor = colors[index % colors.length];
                    return (
                        <div key={index} className={"space-y-4 flex justify-between items-center"}>
                            <div className={"flex gap-2  items-center"}>
                                <div
                                    className={`text-xs font-bold w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
                                    {item.ovrs_pdno}
                                </div>
                                <div className={"flex flex-col font-bold"}>
                                    <div>{item.ovrs_item_name}</div>
                                    <div className={"text-muted-foreground"}>{item.ovrs_cblc_qty}주</div>
                                </div>
                            </div>
                            <div className={"flex flex-col text-end font-bold"}>
                                <div>
                                    $ <AnimatedNumber value={parseFloat(item.ovrs_stck_evlu_amt)} toDollar={true}/>
                                </div>
                                <div
                                    className={cn(item.frcr_evlu_pfls_amt.includes("-") ? "text-blue-600" : "text-red-700",)}>
                                    <AnimatedNumber value={parseFloat(item.frcr_evlu_pfls_amt)}
                                                    toDollar={true}/> (<AnimatedNumber
                                    value={parseFloat(item.evlu_pfls_rt)} toPercent={true}/>)
                                </div>
                            </div>
                        </div>)
                })}

            </>)}
        </div>
    );
};

export default MyStock;