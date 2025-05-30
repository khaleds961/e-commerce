'use client';
import { useLinkStatus } from "next/link";
export default function LoadingIndicator() {
    const {pending} = useLinkStatus();
    return pending ? (
        <div>
            <div role="status" aria-label="Loading" className="spinner" />
        </div>
    ) : null;
}
