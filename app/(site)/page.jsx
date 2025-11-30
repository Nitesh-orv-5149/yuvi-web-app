"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function SignInPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMsg("");

    const res = await signIn("credentials", {
      identifier: emailOrUsername,  // could be email or username
      password,
      role: "client",
      redirect: false,
    });

    console.log("SIGNIN RESPONSE:", res);

    if (res?.error) {
      setErrorMsg(res.error);
      return;
    }

    // If login success, redirect manually
    window.location.href = "/succes";
  }

  return (
    <div style={{ padding: 40, maxWidth: 300 }}>
      <h2>Sign In</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="text"
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      {errorMsg && (
        <p style={{ color: "red", marginTop: 10 }}>{errorMsg}</p>
      )}

      <button onClick={() => signOut({redirect: true, callbackUrl: `${process.env.NEXT_PUBLIC_URL}/signedout`,})}>signout</button>
    </div>
  );
}
