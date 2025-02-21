import React, {useState} from "react";
import {FiImage} from "react-icons/fi";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {mutate} from "swr";
// import Image from 'next/image'

const NewInsightCard = ({setCanAdd}) => {
    const [newProperty, setProperty] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {data: session} = useSession();

    async function addProperty() {
        if (!newProperty.title) return toast.error('Title is required');
        if (!newProperty.description) return toast.error('Description is required');
        if (!newProperty.price) return toast.error('Price is required');
        if (!newProperty.location) return toast.error('Location is required');
        if (!newProperty.image) return toast.error('Image is required');
        setIsLoading(true);
        toast.promise(
            fetch("/api/properties", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newProperty.title,
                    description: newProperty.description,
                    price: newProperty.price,
                    image: newProperty.image,
                    location: newProperty.location,
                    hostId: session.user.id,
                }),
            }).then((response) => {
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error(`Failed to add property`);
                }
                return response.json();
            }).then((newProperty) => {
                mutate();
                setCanAdd(false);
                return newProperty;
            }),
            {
                pending: `Adding new Property: ${newProperty.title}`,
                error: 'Failed to add property',
                success: 'Done',
            });

    }

    return (
        <div className="flex justify-center mt-4 md:flex-row flex-col gap-4">
            <div>
                {("image" in newProperty)
                    ? <img src={newProperty.image}
                           className="md:w-[350px] w-full h-[250px] rounded-[32px] object-cover"
                           alt=""/>
                    : <div
                        className="md:w-[350px] w-full h-[250px] rounded-[32px] bg-slate-200 flex items-center justify-center">
                        <FiImage className="text-third-color text-9xl"/>
                    </div>
                }
                <input
                    className='md:w-[350px] w-full h-12 rounded-full mt-4 mr-10 bg-slate-200 text-third-color px-3 focus:outline-none border-third-color focus:border-4 border-2'
                    type='text'
                    placeholder='Image public url'
                    onChange={(e) => {
                        newProperty.image = e.target.value
                        newProperty.image.trim()
                        setProperty({...newProperty})
                    }}/>
            </div>
            <div>
                <div className="flex justify-between">
                    <input
                        className='rounded-full w-96 mr-10 bg-slate-200 text-third-color px-3 focus:outline-none border-third-color focus:border-4 border-2'
                        type='text'
                        placeholder='Property Title'
                        onChange={(e) => {
                            newProperty.title = e.target.value
                            newProperty.title.trim()
                            setProperty({...newProperty})
                        }}/>

                    <button
                        className={`${
                            !isLoading
                                ? "bg-third-color text-white"
                                : "bg-slate-200 text-slate-500"
                        } h-12 teext-md px-7 rounded-full`}
                        disabled={isLoading}
                        onClick={addProperty}>
                        {isLoading ? "Adding..." : "Add This Property"}
                    </button>

                </div>

                <div className="flex flex-row mt-3">
                    <input
                        className='rounded-full h-12 w-full bg-slate-200 text-third-color px-3 focus:outline-none border-third-color focus:border-4 border-2'
                        type='text'
                        placeholder='Property location'
                        onChange={(e) => {
                            newProperty.location = e.target.value
                            newProperty.location.trim()
                            setProperty({...newProperty})
                        }}/>
                    <input
                        className='rounded-full h-12 ml-3 w-full bg-slate-200 text-third-color px-3 focus:outline-none border-third-color focus:border-4 border-2'
                        type='text'
                        placeholder='Property Price'
                        onChange={(e) => {
                            newProperty.price = e.target.value
                            parseInt(newProperty.price.trim())
                            setProperty({...newProperty})
                        }}/>
                </div>
                <textarea id="floatingTextarea"
                          className="rounded-2xl w-full mt-4 bg-slate-200 text-third-color px-3 focus:outline-none border-third-color focus:border-4 border-2"
                          placeholder="Description"
                          style={{height: 240}}
                          value={newProperty.description || ''}
                          onChange={(e) => {
                              newProperty.description = e.target.value
                              newProperty.description.trim()
                              setProperty({...newProperty})
                          }}/>
            </div>

        </div>

    );
};

export default NewInsightCard;
