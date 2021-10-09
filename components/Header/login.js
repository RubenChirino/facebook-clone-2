import Head from "next/head";

import Image from "next/image";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="grid place-items-center">
      <Head>
        <title>Login with Facebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="/images/facebook.png"
        alt="Facebook"
        height={400}
        width={400}
        objectFit="contain"
      />
      <button
        onClick={signIn}
        className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
      >
        Login with Facebook
      </button>
    </div>
  );
}

export default Login;
