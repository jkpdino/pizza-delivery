"use client";


import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();

    const orderId = searchParams.get("id");
    const sessionId = searchParams.get("session_id");
}