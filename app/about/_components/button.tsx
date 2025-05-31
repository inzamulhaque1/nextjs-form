"use client";
import React from 'react';

import { useRouter } from "next/navigation";

const PrimaryButton = () => {
      const router = useRouter();
    return (
        <div>
            <button onClick={()=> router.push('/')} className='p-3 bg-red-500'>CLick Me</button>
        </div>
    );
};

export default PrimaryButton;