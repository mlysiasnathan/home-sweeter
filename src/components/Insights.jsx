"use client";
import React, {useState} from "react";
import {motion} from "framer-motion";
import {useSession} from "next-auth/react";
import useSWR from "swr";

import {staggerContainer} from "../contants/motion";
import {insights} from "../contants/appdata";
import styles from "../contants/styles";
import TitleText from "./TitleText";
import InsightCard from "./InsightCard";
import NewInsightCard from "./NewInsightCard";

const fetcher = (url) => fetch(url).then((res) => res.json())

const Insights = () => {
    const [canAdd, setCanAdd] = useState(false);
    const {data: properties, error} = useSWR("/api/properties", fetcher);
    const {data: session} = useSession();
    if (error) return <div className="text-red-600">Error loading properties.</div>;
    if (!properties) return <TitleText title="Loading properties..."/>;

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{once: false, amount: 0.25}}
            className={`${styles.innerWidth} mx-auto flex flex-col`}>
            {(session && session.user.role === 'host') && (
                <div className="flex flex-col content-center items-center">
                    <button className="bg-third-color text-white h-12 text-md w-80 rounded-full"
                            onClick={() => setCanAdd(!canAdd)}>
                        {canAdd ? "Close" : "Add Property"}
                    </button>
                </div>
            )}
            {canAdd && <NewInsightCard setCanAdd={setCanAdd}/>}
            {properties.length
                ? <>
                    <TitleText title="Our Fleet"/>
                    <div className="mt-12 flex flex-col gap-9">
                        {properties.map((property, index) => (
                            <InsightCard
                                key={index}
                                property={property}
                                index={index}
                            />
                        ))}
                    </div>
                </>
                : <>
                    <TitleText title="No Properties published yet"/>
                    <div className="mt-12 flex flex-col gap-9">
                        {insights?.map((insight, index) => (
                            <InsightCard
                                key={index}
                                property={insight}
                                index={index}
                            />
                        ))}
                    </div>
                </>
            }
        </motion.div>
    );
};

export default Insights;
