"use client";

import { Coins, Clock, Droplet } from "lucide-react";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import { formatEther } from "viem";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDuration } from "@/lib/utils";

const FaucetInfoSkeleton = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-4 items-center justify-center">
                {[1, 2, 3].map((index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary-foreground/20"
                    >
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const FaucetInfo: FC<{
    balance?: bigint;
    faucetAmount?: bigint;
    cooldownPeriod?: bigint;
}> = ({ balance, faucetAmount, cooldownPeriod }) => {
    const items = useMemo(
        () => [
            {
                title: "Balance",
                value: `${balance ? formatEther(balance) : "0"} ETH`,
                icon: Coins,
                color: "text-green-500 bg-green-500/10",
            },
            {
                title: "Faucet Amount",
                value: `${faucetAmount ? formatEther(faucetAmount) : "0"} ETH`,
                icon: Droplet,
                color: "text-blue-500 bg-blue-500/10",
            },
            {
                title: "Cooldown",
                value: formatDuration(cooldownPeriod),
                icon: Clock,
                color: "text-purple-500 bg-purple-500/10",
            },
        ],
        [balance, faucetAmount, cooldownPeriod]
    );

    if (
        balance === undefined ||
        faucetAmount === undefined ||
        cooldownPeriod === undefined
    ) {
        return <FaucetInfoSkeleton />;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-4 items-center justify-center">
                {items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="flex items-center gap-3 px-4 py-2 rounded-full"
                    >
                        <div className={`p-2 rounded-full ${item.color}`}>
                            <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">
                                {item.title}
                            </span>
                            <span className="font-medium">{item.value}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FaucetInfo;
