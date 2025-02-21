import React from "react";
import {motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {fadeIn} from "../contants/motion";

const InsightCard = ({property, index, isForm}) => {
    const searchParams = useSearchParams();
    const option = searchParams.get("option");
    const router = useRouter();
    return (
        <motion.div
            variants={fadeIn("up", "string", index * 0.5, 1)}
            className="flex justify-center md:flex-row flex-col gap-4"
        >
            <img src={property.image}
                 className="md:w-[350px] w-full h-[250px] rounded-[32px] object-cover"
                 alt=""
            />
            <div>
                <div className="flex justify-between">
                    <h4 className="font-extrabold text-slate-500 lg:text-[42px] text-[26px]">
                        {property.title}
                    </h4>
                    <button onClick={() => router.push(`/rentals/${property.id}`, {
                        scroll: false, state: property
                    })}
                            className={`${
                                option === index
                                    ? "bg-third-color text-white"
                                    : "bg-slate-200 text-slate-500"
                            } h-12 teext-md px-7 rounded-full`}
                            disabled={option === index}>
                        Select
                    </button>

                </div>
                <p className="mt-4 font-normal lg:text-lg text-sm text-slate-400">
                    {property.description}
                </p>
            </div>
        </motion.div>
    );
};

export default InsightCard;
