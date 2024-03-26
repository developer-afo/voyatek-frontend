"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setTimeout } from "timers";

export default function ResetPasswordPage() {
  const [identity, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("identity", identity);
    formData.append("code", code);
    formData.append("password", password);

    const response = await fetch(
      "https://web.afolabisalawu.site/api/resetPassword",
      {
        method: "POST",
        body: formData,
      },
    );

    // Note: response.json() returns a promise, so you need to await it or use .then() to handle the response
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status == "success") {
      setSuccess("Password Reset Successfully");
      setEmail("");
      setCode("");
      setPassword("");
      setTimeout("2000");
      router.push("/auth/login");
    } else {
      setError(responseData.message);
    }
  };

  return (
    <div className="w-full h-full flex">
      <section className="w-1/2 h-full px-20 py-10 flex flex-col gap-20">
        <header className="flex items-center justify-between">
          <Image src={"/logo.svg"} alt="logo" width={100} height={100} />

          <p className="text-[#676E7E]">
            Are you new to GoPaddi?
            <Link href={"/auth/register/"} className="text-[#0D6EFD]">
              {" "}
              Sign Up
            </Link>
          </p>
        </header>

        <div className="flex flex-col justify-start items-start gap-5">
          <h1 className="font-[600] text-[36px]">Reset Password</h1>
        </div>

        <div className="flex flex-col gap-10">
          {error && (
            <div className="text-red-500">
              <p dangerouslySetInnerHTML={{ __html: error }} />
            </div>
          )}

          {success && (
            <p className="text-success-500">Password Reset Successful</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-start items-start gap-4 w-full">
              <label htmlFor="email">Email Or Username</label>
              <input
                id="email"
                type="text"
                className="w-full h-[56px] rounded-[4px] border-[1px] border-[#98A2B3] p-[14px]"
                placeholder="your@email.com/voyatek"
                required
                value={identity}
                onChange={handleEmailChange}
              />
            </div>

            <div className="flex flex-col justify-start items-start gap-4 w-full">
              <label htmlFor="email">Reset Code</label>
              <input
                id="code"
                type="text"
                className="w-full h-[56px] rounded-[4px] border-[1px] border-[#98A2B3] p-[14px]"
                placeholder="Enter Reset Code"
                required
                value={code}
                onChange={handleCodeChange}
              />
              <small className="text-red-500">
                check your email for reset code
              </small>
            </div>

            <div className="flex flex-col justify-start items-start gap-4 w-full">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full h-[56px] rounded-[4px] border-[1px] border-[#98A2B3] p-[14px]"
                placeholder="Enter your password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <button className="w-full h-[56px] rounded-[4px] flex items-center justify-center gap-4 bg-[#0D6EFD] text-white disabled:bg-[#E7F0FF] disabled:text-[#98A2B3] disabled:cursor-not-allowed">
              Submit
            </button>
          </form>
        </div>
      </section>

      <section className="w-1/2 h-full bg-[#0054E4] relative grid place-items-center place-content-center">
        <Image
          src={"/clouds.png"}
          width={500}
          height={500}
          className="h-[500px] w-[80%] absolute top-5 right-[-10px] z-10"
          alt="clouds"
        />

        <Image
          src={"/buildings.png"}
          width={500}
          height={500}
          className="h-[500px] w-[100%] absolute bottom-[5%] z-10"
          alt="clouds"
        />

        <Image
          src={"/water.png"}
          width={500}
          height={500}
          className="h-[100px] w-[100%] absolute bottom-0 z-10"
          alt="clouds"
        />

        <div className="z-40 px-40">
          <h4 className="text-white text-[40px] font-[700] leading-[48px]">
            Welcome to Gopaddi !!
          </h4>
          <p className="text-white text-[20px] leading-[28px] font-[400]">
            Welcome to Gopaddi, your one-stop shop for unforgettable travel
            experiences! Dive into curated getaways, explore hidden gems, and
            unlock exclusive deals. Let&apos;s turn your travel dreams into
            memories that last a lifetime. Explore with us!{" "}
          </p>
        </div>
      </section>
    </div>
  );
}
