// import { axiosKonsumeInstance } from "@/http/konsume";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { toast } from "react-toastify";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       httpOptions: {
//         timeout: 40000,
//       },
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//           scope: "openid email profile"
//         },
//       },
//     }),
//   ],
//  callbacks: {
//   async jwt({ token, account, user }) {
//     console.log("JWT callback invoked");
//     console.log(user);

//     try {
//       const res = await axiosKonsumeInstance.post('/api/auth/SignInWithGoogle/Token', {}, {
//         headers: {
//           Authorization: `Bearer ${account.id_token}`,
//         }
//       })
//       console.log(res);
      
//       // Log the access token for debugging
//       console.log('Access token:', account.access_token);
//       toast.success(account.access_token);

//       if (!res.ok) {
//         const errorText = await res.text(); // Get the error response
//         console.error('Failed to fetch from backend:', res.status, errorText);
//         throw new Error('Failed to fetch user data from backend.');
//       }

//       const resParsed = await res.json();
//       token = {
//         ...token,
//         id_token: account.id_token,
//         myToken: resParsed.authToken,
//       };

//     } catch (error) {
//       console.error('Error in JWT callback:', error);
//       toast.error('An error occurred while processing your request.');
//     }
  
//   return token;
// },
//   async session({ session, token }) {
//     if (session) {
//       session = Object.assign({}, session, {
//         id_token: token.id_token,
//       });
//       session = Object.assign({}, session, {
//         authToken: token.myToken,
//       });
//     }
//     console.log(session);
      
//     return session;
//   },
// }
// });

// export default handler;
