'use client'
import SignupPage from "./signup";
import {useRouter} from "next/navigation";
import react from "react";
export default function Home(){
  const router = useRouter();
  return (
    <>
    <SignupPage/>

    </>
  )
}