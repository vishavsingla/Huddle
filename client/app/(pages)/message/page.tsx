"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";

function Message() {
    const socket = useMemo(() => io("http://localhost:5000"), []);
    // const socket = io("http://localhost:5000");
    const [message, setMessage] = useState("");
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected", socket.id);
        });
        socket.on("welcome", (data) => {
            console.log(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleMessageSubmit = (e: any) => {
        e.preventDefault();
        socket.emit("message", message);
        setMessage("");
    };

    return (
        <div className="flex items-center justify-center">
            <div className="py-10">
                <div className="flex text-2xl font-extrabold">
                    Welcome to Messaging
                </div>
                <div className="flex my-10 items-center justify-center">
                    <form onSubmit={handleMessageSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <Input
                                id="message"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Send</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Message;
