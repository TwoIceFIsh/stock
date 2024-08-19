"use client"
import * as React from "react"
import {useEffect, useState} from "react"
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {cn} from "@/lib/utils";

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "$",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

interface MyChartProps {
    data: any,
    percent: any
}

interface ChartType {
    date: string,
    mobile: number,
}

export function MyChart({data, percent}: MyChartProps) {
    const [cdata, setData] = useState(data);

    const [timeRange, setTimeRange] = React.useState("90d")
    const filteredData = cdata.filter((item: ChartType) => {
        const date = new Date(item.date)
        const now = new Date()
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        now.setDate(now.getDate() - daysToSubtract)
        return date >= now
    })


    useEffect(() => {
        const interval = setInterval(() => {
            // real_data를 갱신하는 로직이 필요하다면 여기에 추가하세요.
            // 아래는 예시로, 만약 서버로부터 데이터를 다시 받아온다면 다음과 같이 할 수 있습니다.
            fetch('/api/v1/chart', {
                cache: "no-cache",
            })  // 실제 데이터를 가져오는 API 경로
                .then(response => response.json())
                .then(newData => {
                    setData(newData.data)
                });
        }, 4000);
        return () => clearInterval(interval);
    }, []);


    return (
        <Card className={"dark"}>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>실시간 계좌 현황</CardTitle>

                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months"/>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            지난 3개월
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            지난 30일
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            지난 7일
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="date"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("ko-KR", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            tickLine={true}
                            axisLine={true}
                            tickMargin={2}
                            minTickGap={10}
                            tickFormatter={(value) => {
                                return (value.toLocaleString("ko-KR"))
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("ko-KR", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="line"
                                />
                            }
                        />
                        <Area
                            dataKey="mobile"
                            type="linear"
                            stroke={cn(percent.includes("-") ? "blue" : "red")}
                            animationDuration={0}
                        />

                        <ChartLegend content={<ChartLegendContent/>}/>
                    </AreaChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}