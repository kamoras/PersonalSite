"use client";

import dynamic from "next/dynamic";

const TextToSpeech = dynamic(() => import("./TextToSpeech"), { ssr: false });

export default TextToSpeech;
