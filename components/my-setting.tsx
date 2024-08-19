"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel,} from "@/components/ui/form"
import {Switch} from "@/components/ui/switch"
import {toast} from "@/components/ui/use-toast"

const FormSchema = z.object({
    logic_rsi: z.boolean().default(false).optional(),
    notify_email: z.boolean(),
})

export function MySetting() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            logic_rsi: false,
            notify_email: false,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "권한없음",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                    <h3 className="mb-4 text-lg  font-bold">시스템 트레이딩</h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="logic_rsi"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            RSI
                                        </FormLabel>
                                        <FormDescription>
                                            과매도 구간 매입
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            disabled
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notify_email"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">이메일 알림</FormLabel>
                                        <FormDescription>
                                            지정된 계정으로 이메일을 수신합니다.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" disabled>저장</Button>
            </form>
        </Form>
    )
}