"use client"
import React, {useEffect} from 'react';
import moment from "moment/moment";
import {useRouter} from "next/navigation";

const MyTimeOut = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.refresh()
        }, 3000)
    });

    return (
        <div>{moment(new Date).format("HH:mm:ss")} 기준
        </div>
    );
};

export default MyTimeOut;